import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, f as renderScript, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_DRANw9YG.mjs';
import { a as getEntry, $ as $$Layout } from '../chunks/Layout_DKjpLSKR.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://farzadhayat.dev");
const $$Quiz$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Quiz$1;
  const { questions } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="min-h-screen bg-base-200 flex items-center justify-center p-4"> <div id="quiz-root" class="card bg-base-100 rounded-3xl shadow-soft w-full max-w-lg"${addAttribute(JSON.stringify(questions), "data-questions")}> <!-- Screen: Intro --> <div id="screen-intro" class="card-body items-center text-center gap-4 py-12"> <div class="text-6xl">🧠</div> <h1 class="card-title text-2xl">Think You Know Me?</h1> <p class="text-base-content/70 max-w-sm">
10 questions across tech, personal, and career facts. How well do you
        really know Farzad?
</p> <p class="text-sm text-base-content/40">~2 minutes</p> <button id="btn-start" class="btn btn-primary btn-wide rounded-full mt-2">
Start Quiz →
</button> </div> <!-- Screen: Question --> <div id="screen-question" class="card-body gap-4 hidden"> <div class="flex justify-between items-center"> <span id="q-counter" class="text-sm text-base-content/60"></span> <span id="q-category" class="badge badge-primary rounded-full"></span> </div> <progress id="q-progress" class="progress progress-primary w-full" value="0"${addAttribute(questions.length, "max")}></progress> <p id="q-text" class="text-lg font-semibold mt-2"></p> <div id="q-options" class="flex flex-col gap-2"></div> </div> <!-- Screen: Reveal --> <div id="screen-reveal" class="card-body gap-4 hidden"> <p id="reveal-indicator" class="text-center text-2xl font-bold"></p> <div id="reveal-correct" class="alert"></div> <p id="reveal-fact" class="text-sm text-base-content/70 italic hidden"></p> <button id="btn-next" class="btn btn-primary rounded-full mt-2"></button> </div> <!-- Screen: Results --> <div id="screen-results" class="card-body items-center text-center gap-4 py-10 hidden"> <div class="text-5xl">🏆</div> <h2 class="text-2xl font-bold">
You scored <span id="r-score"></span> </h2> <div id="r-stars" class="text-3xl"></div> <div id="r-label" class="badge badge-secondary badge-lg rounded-full py-4"></div> <div class="flex gap-2 flex-wrap justify-center mt-2"> <button id="btn-share" class="btn btn-info btn-sm rounded-full">Share result</button> <button id="btn-retry" class="btn btn-ghost btn-sm rounded-full">Try again</button> <a href="/" class="btn btn-ghost btn-sm rounded-full">← Portfolio</a> </div> </div> </div> </div> ${renderScript($$result, "/home/farzad/portfolio/src/components/Quiz.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/farzad/portfolio/src/components/Quiz.astro", void 0);

const $$Quiz = createComponent(async ($$result, $$props, $$slots) => {
  const quizEntry = await getEntry("quiz", "index");
  const questions = quizEntry.data.questions;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Think You Know Me? \u2014 Quiz", "description": "10 questions about Farzad Hayat. How well do you know him?" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "QuizWidget", $$Quiz$1, { "questions": questions })} ` })}`;
}, "/home/farzad/portfolio/src/pages/quiz.astro", void 0);

const $$file = "/home/farzad/portfolio/src/pages/quiz.astro";
const $$url = "/quiz";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Quiz,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
