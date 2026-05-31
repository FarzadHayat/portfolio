import { w as createVNode, F as Fragment, ar as __astro_tag_component__ } from './astro/server_DRANw9YG.mjs';
import { $ as $$Image } from './_astro_assets_KfQri5a7.mjs';
import { $ as $$YouTube } from './YouTube_BjelgLG_.mjs';

const __0_______assets_projects_cloud_transcriber_application_architecture_webp__ = new Proxy({"src":"/_astro/cloud-transcriber.BO11uf1N.webp","width":2224,"height":2314,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/farzad/portfolio/src/assets/projects/cloud-transcriber/application-architecture.webp";
							}
							
							return target[name];
						}
					});

const frontmatter = {
  "featured": true,
  "title": "Cloud Transcriber",
  "description": "Web application for media transcription using AWS, Whisper ASR, and Node.js. Scalable and secure architecture.",
  "image": "../../assets/projects/cloud-transcriber.webp",
  "startDate": "2024-07-22T00:00:00.000Z",
  "endDate": "2024-11-15T00:00:00.000Z",
  "skills": ["AWS", "Nginx", "Express", "Node.js", "Terraform", "Cloud Computing", "Microservices", "Whisper ASR", "FFmpeg", "Postman"]
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "application-overview",
    "text": "Application Overview"
  }, {
    "depth": 2,
    "slug": "application-architecture",
    "text": "Application Architecture"
  }, {
    "depth": 2,
    "slug": "video-presentation",
    "text": "Video Presentation"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    "astro-image": "astro-image",
    em: "em",
    h2: "h2",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  }, _component0 = _components["astro-image"];
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "This project details a web application designed to allow users to upload media files (audio and video) and generate transcriptions of their audio content. The application leverages various AWS services and open-source technologies to ensure efficient processing, scalability, and security."
    }), "\n", createVNode(_components.h2, {
      id: "application-overview",
      children: "Application Overview"
    }), "\n", createVNode(_components.p, {
      children: "The core functionality of the application involves:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Converting video files to MP3 audio"
        }), " using FFmpeg during the upload process."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Transcribing audio files to text"
        }), " using the open-source Whisper ASR (Automatic Speech Recognition) service."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Automatically scaling"
        }), " the transcription service based on workload."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Storing and allowing users to retrieve and view transcriptions"
        }), " from a database."]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "application-architecture",
      children: "Application Architecture"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_component0, {
        alt: "Application Architecture",
        src: __0_______assets_projects_cloud_transcriber_application_architecture_webp__
      })
    }), "\n", createVNode(_components.p, {
      children: "The application is deployed on AWS in the ap-southeast-2 region. Key components and their roles include:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Route 53:"
        }), " Maps the custom domain to the API Gateway endpoint."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "API Gateway:"
        }), " Routes HTTPS traffic to the EC2 instance."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "EC2 Instance:"
        }), " Hosts Docker containers running an Express backend (for REST API) and Nginx (for web client and reverse proxy)."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "ElastiCache:"
        }), " Provides Memcached-based caching to improve API response times."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "ECS Cluster (ECS Whisper Service):"
        }), " Hosts and auto-scales the Whisper transcription service based on the total duration of pending transcription tasks in the SQS queue."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Lambda Functions:"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: [createVNode(_components.em, {
              children: "Conversion Service:"
            }), " Extracts audio from media uploaded to S3 using an FFmpeg layer and adds duration to metadata."]
          }), "\n", createVNode(_components.li, {
            children: [createVNode(_components.em, {
              children: "Custom Metric Calculator:"
            }), " Periodically calculates the total queued audio duration for transcription and publishes it to CloudWatch."]
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "S3 Buckets:"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: [createVNode(_components.em, {
              children: "Media Bucket:"
            }), " Stores media files uploaded by users."]
          }), "\n", createVNode(_components.li, {
            children: [createVNode(_components.em, {
              children: "Audio Bucket:"
            }), " Stores MP3 audio files extracted from uploaded media."]
          }), "\n", createVNode(_components.li, {
            children: [createVNode(_components.em, {
              children: "Transcription Bucket:"
            }), " Stores generated transcription text files."]
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "SQS Queues:"
        }), "\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: [createVNode(_components.em, {
              children: "Audio Processing Queue:"
            }), " Notifies the server when audio extraction completes."]
          }), "\n", createVNode(_components.li, {
            children: [createVNode(_components.em, {
              children: "Transcription Jobs Queue:"
            }), " Manages the queue of transcription jobs."]
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Cognito:"
        }), " Handles user authentication with Google OAuth integration."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "CloudWatch:"
        }), " Monitors logs, schedules Lambda functions, and triggers ECS scaling policies."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Secrets Manager:"
        }), " Securely stores DocumentDB credentials."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Parameter Store:"
        }), " Stores configuration data."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "DocumentDB:"
        }), " Serves as the database for user audio files and transcription data."]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "video-presentation",
      children: "Video Presentation"
    }), "\n", createVNode($$YouTube, {
      id: "GepP1SxA2Wg"
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/projects/cloud-transcriber.mdx";
const file = "/home/farzad/portfolio/src/content/projects/cloud-transcriber.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/farzad/portfolio/src/content/projects/cloud-transcriber.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
