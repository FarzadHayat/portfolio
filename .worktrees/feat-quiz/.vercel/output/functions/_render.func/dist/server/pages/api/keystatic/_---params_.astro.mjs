import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { config as config$1, collection, fields, singleton } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';
export { renderers } from '../../../renderers.mjs';

var setCookie = {exports: {}};

var hasRequiredSetCookie;

function requireSetCookie () {
	if (hasRequiredSetCookie) return setCookie.exports;
	hasRequiredSetCookie = 1;

	var defaultParseOptions = {
	  decodeValues: true,
	  map: false,
	  silent: false,
	};

	function isForbiddenKey(key) {
	  return typeof key !== "string" || key in {};
	}

	function createNullObj() {
	  return Object.create(null);
	}

	function isNonEmptyString(str) {
	  return typeof str === "string" && !!str.trim();
	}

	function parseString(setCookieValue, options) {
	  var parts = setCookieValue.split(";").filter(isNonEmptyString);

	  var nameValuePairStr = parts.shift();
	  var parsed = parseNameValuePair(nameValuePairStr);
	  var name = parsed.name;
	  var value = parsed.value;

	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  if (isForbiddenKey(name)) {
	    return null;
	  }

	  try {
	    value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
	  } catch (e) {
	    console.error(
	      "set-cookie-parser: failed to decode cookie value. Set options.decodeValues=false to disable decoding.",
	      e
	    );
	  }

	  var cookie = createNullObj();
	  cookie.name = name;
	  cookie.value = value;

	  parts.forEach(function (part) {
	    var sides = part.split("=");
	    var key = sides.shift().trimLeft().toLowerCase();
	    if (isForbiddenKey(key)) {
	      return;
	    }
	    var value = sides.join("=");
	    if (key === "expires") {
	      cookie.expires = new Date(value);
	    } else if (key === "max-age") {
	      var n = parseInt(value, 10);
	      if (!Number.isNaN(n)) cookie.maxAge = n;
	    } else if (key === "secure") {
	      cookie.secure = true;
	    } else if (key === "httponly") {
	      cookie.httpOnly = true;
	    } else if (key === "samesite") {
	      cookie.sameSite = value;
	    } else if (key === "partitioned") {
	      cookie.partitioned = true;
	    } else if (key) {
	      cookie[key] = value;
	    }
	  });

	  return cookie;
	}

	function parseNameValuePair(nameValuePairStr) {
	  // Parses name-value-pair according to rfc6265bis draft

	  var name = "";
	  var value = "";
	  var nameValueArr = nameValuePairStr.split("=");
	  if (nameValueArr.length > 1) {
	    name = nameValueArr.shift();
	    value = nameValueArr.join("="); // everything after the first =, joined by a "=" if there was more than one part
	  } else {
	    value = nameValuePairStr;
	  }

	  return { name: name, value: value };
	}

	function parse(input, options) {
	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  if (!input) {
	    if (!options.map) {
	      return [];
	    } else {
	      return createNullObj();
	    }
	  }

	  if (input.headers) {
	    if (typeof input.headers.getSetCookie === "function") {
	      // for fetch responses - they combine headers of the same type in the headers array,
	      // but getSetCookie returns an uncombined array
	      input = input.headers.getSetCookie();
	    } else if (input.headers["set-cookie"]) {
	      // fast-path for node.js (which automatically normalizes header names to lower-case)
	      input = input.headers["set-cookie"];
	    } else {
	      // slow-path for other environments - see #25
	      var sch =
	        input.headers[
	          Object.keys(input.headers).find(function (key) {
	            return key.toLowerCase() === "set-cookie";
	          })
	        ];
	      // warn if called on a request-like object with a cookie header rather than a set-cookie header - see #34, 36
	      if (!sch && input.headers.cookie && !options.silent) {
	        console.warn(
	          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
	        );
	      }
	      input = sch;
	    }
	  }
	  if (!Array.isArray(input)) {
	    input = [input];
	  }

	  if (!options.map) {
	    return input
	      .filter(isNonEmptyString)
	      .map(function (str) {
	        return parseString(str, options);
	      })
	      .filter(Boolean);
	  } else {
	    var cookies = createNullObj();
	    return input.filter(isNonEmptyString).reduce(function (cookies, str) {
	      var cookie = parseString(str, options);
	      if (cookie && !isForbiddenKey(cookie.name)) {
	        cookies[cookie.name] = cookie;
	      }
	      return cookies;
	    }, cookies);
	  }
	}

	/*
	  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
	  that are within a single set-cookie field-value, such as in the Expires portion.

	  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
	  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
	  React Native's fetch does this for *every* header, including set-cookie.

	  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
	  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
	*/
	function splitCookiesString(cookiesString) {
	  if (Array.isArray(cookiesString)) {
	    return cookiesString;
	  }
	  if (typeof cookiesString !== "string") {
	    return [];
	  }

	  var cookiesStrings = [];
	  var pos = 0;
	  var start;
	  var ch;
	  var lastComma;
	  var nextStart;
	  var cookiesSeparatorFound;

	  function skipWhitespace() {
	    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
	      pos += 1;
	    }
	    return pos < cookiesString.length;
	  }

	  function notSpecialChar() {
	    ch = cookiesString.charAt(pos);

	    return ch !== "=" && ch !== ";" && ch !== ",";
	  }

	  while (pos < cookiesString.length) {
	    start = pos;
	    cookiesSeparatorFound = false;

	    while (skipWhitespace()) {
	      ch = cookiesString.charAt(pos);
	      if (ch === ",") {
	        // ',' is a cookie separator if we have later first '=', not ';' or ','
	        lastComma = pos;
	        pos += 1;

	        skipWhitespace();
	        nextStart = pos;

	        while (pos < cookiesString.length && notSpecialChar()) {
	          pos += 1;
	        }

	        // currently special character
	        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
	          // we found cookies separator
	          cookiesSeparatorFound = true;
	          // pos is inside the next cookie, so back up and return it.
	          pos = nextStart;
	          cookiesStrings.push(cookiesString.substring(start, lastComma));
	          start = pos;
	        } else {
	          // in param ',' or param separator ';',
	          // we continue from that comma
	          pos = lastComma + 1;
	        }
	      } else {
	        pos += 1;
	      }
	    }

	    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
	      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
	    }
	  }

	  return cookiesStrings;
	}

	setCookie.exports = parse;
	setCookie.exports.parse = parse;
	setCookie.exports.parseString = parseString;
	setCookie.exports.splitCookiesString = splitCookiesString;
	return setCookie.exports;
}

var setCookieExports = /*@__PURE__*/ requireSetCookie();

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return undefined                                          ;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return undefined                                              ;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return undefined                                ;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = setCookieExports.parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const config = config$1({
  storage: {
    kind: "local"
  },
  singletons: {
    hero: singleton({
      label: "Hero Section",
      path: "src/content/hero/",
      schema: {
        name: fields.text({
          label: "Name",
          description: "Your name or site name"
        }),
        title: fields.text({
          label: "Title",
          description: "Main headline/tagline"
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          description: "Hero section description"
        }),
        avatar: fields.image({
          label: "Avatar",
          directory: "src/assets/hero",
          publicPath: "@assets/hero/"
        }),
        location: fields.text({
          label: "Location",
          description: 'e.g., "🇧🇷 Brazil"'
        }),
        socialLinks: fields.array(
          fields.object({
            url: fields.text({
              label: "URL",
              description: "Profile URL or mailto: link",
              validation: { isRequired: true }
            }),
            icon: fields.select({
              label: "Icon",
              description: "Select a social media icon",
              options: [
                { label: "GitHub", value: "GitHub" },
                { label: "LinkedIn", value: "LinkedIn" },
                { label: "Twitter/X", value: "Twitter" },
                { label: "Bluesky", value: "Bluesky" },
                { label: "Instagram", value: "Instagram" },
                { label: "YouTube", value: "YouTube" },
                { label: "Email", value: "Email" },
                { label: "CodeTips (Folder)", value: "FolderCode" }
              ],
              defaultValue: "GitHub"
            }),
            label: fields.text({
              label: "Aria Label",
              description: "Accessibility label (e.g., 'GitHub', 'Email')",
              validation: { isRequired: true }
            })
          }),
          {
            label: "Social Links",
            itemLabel: (props) => props.fields.label.value || "New Link",
            description: "Your social media and contact links"
          }
        )
      }
    }),
    about: singleton({
      label: "About",
      path: "src/content/about/",
      format: {
        contentField: "content"
      },
      schema: {
        title: fields.text({
          label: "Title",
          description: "About section title"
        }),
        photo: fields.image({
          label: "Photo",
          directory: "src/assets/about",
          publicPath: "@assets/about/",
          description: "Your photo for the about section"
        }),
        content: fields.markdoc({
          label: "Content",
          description: "About section content (supports Markdown)",
          extension: "md"
        }),
        link: fields.url({
          label: "LinkedIn URL or Other",
          description: "Your LinkedIn profile URL or other link"
        })
      }
    }),
    general: singleton({
      label: "General Settings",
      path: "src/content/general/",
      schema: {
        enableThemeSelector: fields.checkbox({
          label: "Enable Theme Selector",
          description: "Show theme dropdown instead of toggle switch",
          defaultValue: true
        }),
        extraLinksEnabled: fields.checkbox({
          label: "Enable Extra Links FAB",
          description: "Show floating action button with extra links",
          defaultValue: true
        }),
        extraLinks: fields.array(
          fields.object({
            link: fields.text({
              label: "Link URL",
              description: "URL or path (e.g., /blog or https://example.com)",
              validation: { isRequired: true }
            }),
            icon: fields.select({
              label: "Icon",
              description: "Select an icon from Lucide icon library",
              options: [
                { label: "Flower (Flower2)", value: "Flower2" },
                { label: "Book (BookOpen)", value: "BookOpen" },
                { label: "File (FileText)", value: "FileText" },
                { label: "Code (CodeXml)", value: "CodeXml" },
                { label: "Mail (Mail)", value: "Mail" },
                { label: "Home (Home)", value: "Home" },
                { label: "User (User)", value: "User" },
                { label: "Briefcase (Briefcase)", value: "Briefcase" },
                {
                  label: "Graduation Cap (GraduationCap)",
                  value: "GraduationCap"
                },
                { label: "Award (Award)", value: "Award" },
                { label: "Link (Link)", value: "Link" }
              ],
              defaultValue: "Link"
            }),
            label: fields.text({
              label: "Tooltip Label",
              description: "Label shown on hover",
              validation: { isRequired: true }
            }),
            displayOn: fields.select({
              label: "Display On",
              description: "Where this link should be displayed",
              options: [
                { label: "Both (Dock & Fab)", value: "both" },
                { label: "Only Dock (Mobile)", value: "dock" },
                { label: "Only Fab (Desktop)", value: "fab" }
              ],
              defaultValue: "both"
            })
          }),
          {
            label: "Extra Links",
            itemLabel: (props) => props.fields.label.value || "New Link",
            description: "Links to display in the floating action button"
          }
        ),
        showAboutSection: fields.checkbox({
          label: "Show About Section",
          defaultValue: true
        }),
        showProjectsSection: fields.checkbox({
          label: "Show Projects Section",
          defaultValue: true
        }),
        showBlogSection: fields.checkbox({
          label: "Show Blog Section",
          defaultValue: true
        }),
        showWorkSection: fields.checkbox({
          label: "Show Work Experience Section",
          defaultValue: true
        }),
        showEducationSection: fields.checkbox({
          label: "Show Education Section",
          defaultValue: true
        }),
        showCertificationsSection: fields.checkbox({
          label: "Show Certifications Section",
          defaultValue: true
        }),
        showHackathonsSection: fields.checkbox({
          label: "Show Hackathons Section",
          defaultValue: true
        }),
        showContactSection: fields.checkbox({
          label: "Show Contact Section",
          defaultValue: true
        }),
        showQuizCta: fields.checkbox({
          label: "Show Quiz CTA in Hero",
          description: 'Show "Think you know me? →" button in the Hero section',
          defaultValue: true
        })
      }
    }),
    contact: singleton({
      label: "Contact Section",
      path: "src/content/contact/",
      format: { contentField: "content" },
      schema: {
        icon: fields.select({
          label: "Section Icon",
          description: "Icon displayed at the top of contact section",
          options: [
            {
              label: "Message Circle (MessageCircleCode)",
              value: "MessageCircleCode"
            },
            { label: "Mail (Mail)", value: "Mail" },
            { label: "Phone (Phone)", value: "Phone" }
          ],
          defaultValue: "MessageCircleCode"
        }),
        content: fields.markdoc({
          label: "Contact Message",
          description: "Main contact message (supports Markdown)",
          extension: "md"
        }),
        linkUrl: fields.url({
          label: "Contact Link URL",
          description: "URL for contact link (e.g., Twitter profile)"
        }),
        linkText: fields.text({
          label: "Contact Link Text",
          description: "Text for the contact link"
        }),
        footerIcon: fields.select({
          label: "Footer Icon",
          description: "Icon for footer credit",
          options: [
            { label: "Pickaxe", value: "Pickaxe" },
            { label: "Hammer (Hammer)", value: "Hammer" },
            { label: "Heart (Heart)", value: "Heart" }
          ],
          defaultValue: "Pickaxe"
        }),
        footerText: fields.text({
          label: "Footer Text",
          description: "Footer credit text",
          defaultValue: "Crafted by an Artisan"
        }),
        footerLinkText: fields.text({
          label: "Footer Link Text",
          description: "Name/text for footer link"
        }),
        footerLinkUrl: fields.url({
          label: "Footer Link URL",
          description: "URL for footer credit link"
        })
      }
    }),
    quiz: singleton({
      label: "Quiz",
      path: "src/content/quiz/",
      schema: {
        questions: fields.array(
          fields.object({
            question: fields.text({
              label: "Question",
              validation: { isRequired: true }
            }),
            options: fields.array(
              fields.text({ label: "Option", validation: { isRequired: true } }),
              {
                label: "Options",
                description: "Exactly 4 options required",
                itemLabel: (props) => props.value || "Option"
              }
            ),
            correctIndex: fields.integer({
              label: "Correct Answer Index (0–3)",
              description: "0 = first option, 1 = second, 2 = third, 3 = fourth",
              validation: { isRequired: true, min: 0, max: 3 }
            }),
            category: fields.select({
              label: "Category",
              options: [
                { label: "🛠 Tech", value: "tech" },
                { label: "🎯 Personal", value: "personal" },
                { label: "💼 Career", value: "career" }
              ],
              defaultValue: "personal"
            }),
            funFact: fields.text({
              label: "Fun Fact",
              multiline: true,
              description: "Shown after the answer is revealed (optional)"
            })
          }),
          {
            label: "Questions",
            itemLabel: (props) => props.fields.question.value || "New Question"
          }
        )
      }
    })
  },
  collections: {
    work: collection({
      label: "Work Experience",
      path: "src/content/work/*",
      slugField: "title",
      format: {
        contentField: "content"
      },
      schema: {
        title: fields.slug({
          name: { label: "Company Name" }
        }),
        subtitle: fields.text({
          label: "Position",
          description: "Job title/role"
        }),
        location: fields.text({
          label: "Location",
          description: "Country or city (e.g., 'Brazil', 'Remote')"
        }),
        startDate: fields.date({
          label: "Start Date",
          validation: { isRequired: true }
        }),
        endDate: fields.date({
          label: "End Date",
          description: "Leave empty if current position"
        }),
        logo: fields.image({
          label: "Company Logo",
          directory: "src/assets/work",
          publicPath: "@assets/work/",
          description: "Optional company logo"
        }),
        link: fields.url({
          label: "Company Website",
          description: "Optional link to company website"
        }),
        content: fields.markdoc({
          label: "Description",
          description: "Job responsibilities and achievements",
          extension: "md"
        }),
        skills: fields.array(fields.text({ label: "Skill" }), {
          label: "Skills/Technologies",
          itemLabel: (props) => props.value,
          description: "Technologies and tools used in this role"
        })
      }
    }),
    education: collection({
      label: "Education",
      path: "src/content/education/*",
      slugField: "title",
      format: {
        contentField: "content"
      },
      schema: {
        title: fields.slug({
          name: { label: "Institution Name" }
        }),
        subtitle: fields.text({
          label: "Degree/Course",
          description: 'e.g., "Bachelor of Computer Science"'
        }),
        startDate: fields.date({
          label: "Start Date",
          validation: { isRequired: true }
        }),
        endDate: fields.date({
          label: "End Date",
          description: "Leave empty if ongoing"
        }),
        logo: fields.image({
          label: "Institution Logo",
          directory: "src/assets/education",
          publicPath: "@assets/education/",
          description: "Optional institution logo"
        }),
        link: fields.url({
          label: "Institution Website",
          description: "Optional link to institution website"
        }),
        content: fields.markdoc({
          label: "Description",
          description: "Education details and achievements",
          extension: "md"
        })
      }
    }),
    certifications: collection({
      label: "Certifications",
      path: "src/content/certifications/*",
      slugField: "title",
      format: {
        contentField: "content"
      },
      schema: {
        title: fields.slug({
          name: { label: "Certification Name" }
        }),
        subtitle: fields.text({
          label: "Issuing Organization",
          description: 'e.g., "Amazon Web Services (AWS)"'
        }),
        startDate: fields.date({
          label: "Issue Date",
          validation: { isRequired: true }
        }),
        endDate: fields.date({
          label: "Expiration Date",
          description: "Leave empty if no expiration"
        }),
        logo: fields.image({
          label: "Organization Logo",
          directory: "src/assets/certifications",
          publicPath: "@assets/certifications/",
          description: "Optional organization logo"
        }),
        link: fields.url({
          label: "Credential URL",
          description: "Link to the certificate or badge"
        }),
        content: fields.markdoc({
          label: "Description",
          description: "Certification details",
          extension: "md"
        })
      }
    }),
    projects: collection({
      label: "Projects",
      path: "src/content/projects/*",
      slugField: "title",
      entryLayout: "content",
      format: {
        contentField: "content"
      },
      schema: {
        featured: fields.checkbox({
          label: "Featured Project",
          description: "Show this project on the homepage",
          defaultValue: false
        }),
        title: fields.slug({
          name: { label: "Project Name" }
        }),
        description: fields.text({
          label: "Short Description",
          multiline: true,
          description: "Brief project summary for cards"
        }),
        image: fields.image({
          label: "Project Image",
          directory: "src/assets/projects",
          publicPath: "@assets/projects/",
          validation: { isRequired: true },
          description: "Main project image"
        }),
        startDate: fields.date({
          label: "Start Date",
          validation: { isRequired: true }
        }),
        endDate: fields.date({
          label: "End Date",
          description: "Leave empty if ongoing"
        }),
        skills: fields.array(fields.text({ label: "Skill" }), {
          label: "Skills/Technologies",
          itemLabel: (props) => props.value,
          description: "Technologies and tools used in this project"
        }),
        demoLink: fields.url({
          label: "Demo Link",
          description: "Live demo URL (optional)"
        }),
        sourceLink: fields.url({
          label: "Source Code Link",
          description: "GitHub or repository URL (optional)"
        }),
        content: fields.markdoc({
          label: "Full Description",
          description: "Detailed project information",
          extension: "md",
          options: {
            image: {
              directory: "src/assets/projects",
              publicPath: "@assets/projects/"
            }
          },
          components: {
            Spotify: block({
              label: "Spotify Playlist",
              schema: {
                url: fields.text({ label: "Playlist ID" })
              }
            })
          }
        })
      }
    }),
    blog: collection({
      label: "Blog Posts",
      path: "src/content/blog/**",
      slugField: "title",
      entryLayout: "content",
      format: {
        contentField: "content"
      },
      schema: {
        title: fields.slug({
          name: { label: "Post Title" }
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          description: "SEO description and excerpt"
        }),
        image: fields.image({
          label: "Cover Image",
          directory: "src/assets/blog",
          publicPath: "@assets/blog/",
          validation: { isRequired: true },
          description: "Blog post cover image"
        }),
        publishDate: fields.date({
          label: "Publish Date",
          validation: { isRequired: true }
        }),
        updatedDate: fields.date({
          label: "Updated Date",
          description: "Last update date (optional)"
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
          description: "Blog post tags"
        }),
        content: fields.markdoc({
          label: "Content",
          description: "Blog post content",
          options: {
            image: {
              directory: "src/assets/blog",
              publicPath: "@assets/blog/"
            }
          },
          components: {
            Spotify: block({
              label: "Spotify Embed",
              schema: {
                url: fields.text({
                  label: "Spotify URL",
                  description: "Full Spotify URL (track, album, playlist, or podcast)",
                  validation: { isRequired: true }
                })
              }
            }),
            YouTube: block({
              label: "YouTube Video",
              schema: {
                id: fields.text({
                  label: "Video ID",
                  description: "YouTube video ID (optional if URL is provided)"
                }),
                url: fields.text({
                  label: "YouTube URL",
                  description: "Full YouTube URL (optional if ID is provided)"
                })
              }
            }),
            Twitter: block({
              label: "Twitter/X Embed",
              schema: {
                url: fields.text({
                  label: "Tweet URL",
                  description: "Full Twitter/X URL"
                }),
                id: fields.text({
                  label: "Tweet ID",
                  description: "Tweet ID (optional if URL is provided)"
                }),
                username: fields.text({
                  label: "Username",
                  description: "Twitter username (optional if URL is provided)"
                })
              }
            })
          }
        })
      }
    }),
    hackathons: collection({
      label: "Hackathons",
      path: "src/content/hackathons/*",
      slugField: "title",
      format: {
        contentField: "content"
      },
      schema: {
        title: fields.slug({
          name: { label: "Hackathon Name" }
        }),
        location: fields.text({
          label: "Location",
          description: 'City, venue, or "Virtual"'
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          description: "Brief hackathon summary"
        }),
        startDate: fields.date({
          label: "Start Date",
          validation: { isRequired: true }
        }),
        endDate: fields.date({
          label: "End Date",
          description: "Last day of event (optional)"
        }),
        logo: fields.image({
          label: "Event Logo",
          directory: "src/assets/hackathons",
          publicPath: "@assets/hackathons/",
          description: "Optional event logo"
        }),
        sourceLink: fields.url({
          label: "Project Link",
          description: "GitHub repo or project URL (optional)"
        }),
        content: fields.markdoc({
          label: "Full Description",
          description: "Detailed information about the hackathon and project",
          extension: "md"
        })
      }
    })
  }
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
