(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();function b(){return`
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-4xl font-bold text-blue-400 mb-6">
        RepoFinder
      </h1>

      <form id="searchForm" class="flex gap-2 mb-6">
        <input
          id="usernameInput"
          type="text" 
          placeholder="GitHub username..."
          class="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          id="searchBtn" type="submit"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium"
        >
          Search
        </button>
      </form>
      <div id="status" class="text-sm text-gray-400 mb-4"></div>
      <div id="repos" class="flex flex-col gap-4"></div>
      
      <div id="pagination" class="mt-6 flex items-center justify-between">
        <button id="prevBtn" type="button" class="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-40" disabled>
          Prev
        </button>

        <span id="pageInfo" class="text-sm text-gray-400">Page 1</span>

        <button id="nextBtn" type="button" class="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-40" disabled>
          Next
        </button>
      </div>
    </div>
  `}function d(r){return r.status==="loading"?'<p class="text-sm text-gray-300">Loading...</p>':r.status==="error"?`<p class="bg-red-500/10 border border-red-500/30 text-red-200 rounded p-3 text-sm">${r.errorMessage}</p>`:""}function y(r){return r.length===0?`<div class="text-sm text-gray-400">
    No repositories found. 
    </div>`:r.map(a=>{const o=new Date(a.updated_at).toLocaleDateString();return`<div class="bg-gray-800 border border-gray-700 rounded p-4">
  <div class="flex justify-between items-start">
    <h3 class="text-lg font-semibold text-blue-400">${a.name}</h3>
    <span class="text-sm text-yellow-400">⭐ ${a.stargazers_count}</span>
  </div>

  <p class="text-sm text-gray-300 mt-2">
    ${a.description??"No description"}
  </p>

  <div class="mt-3 text-xs text-gray-500">
    Updated: ${o}
  </div>

  <a href="${a.html_url}"
     target="_blank"
     rel="noopener noreferrer"
     class="inline-block mt-3 text-sm text-blue-400 hover:underline">
    View on GitHub →
  </a>
</div>`}).join("")}const t={username:"",page:1,perPage:10,repos:[],status:"idle",errorMessage:""};function i(r){Object.assign(t,r)}async function x({username:r,page:n=1,perPage:a=100}){const o=new URL(`https://api.github.com/users/${r}/repos`);o.searchParams.set("page",n),o.searchParams.set("per_page",a);const e=await fetch(o);if(!e.ok)throw e.status===404?new Error("User not found"):e.status===403?new Error("GitHub API rate limit exceeded"):new Error(`Request failed: ${e.status}`);return await e.json()}const h=document.getElementById("app");h.innerHTML=b();const v=document.getElementById("usernameInput"),u=document.getElementById("status"),L=document.getElementById("searchForm"),l=document.getElementById("repos"),p=document.getElementById("prevBtn"),g=document.getElementById("nextBtn"),w=document.getElementById("pageInfo"),m=document.getElementById("pagination");m.classList.add("hidden");L.addEventListener("submit",async r=>{r.preventDefault();const n=v.value.trim();if(!n){i({status:"error",errorMessage:"Enter GitHub username"}),u.innerHTML=d(t);return}i({username:n,page:1}),await f()});async function f(){i({status:"loading",errorMessage:""}),p.disabled=!0,g.disabled=!0,u.innerHTML=d(t),l.innerHTML="";try{const r=await x({username:t.username,page:t.page,perPage:t.perPage});i({repos:r,status:"idle"}),u.innerHTML=d(t),l.innerHTML=y(t.repos)}catch(r){i({status:"error",errorMessage:r.message,repos:[]}),u.innerHTML=d(t),l.innerHTML=""}t.username&&t.repos.length>0?m.classList.remove("hidden"):m.classList.add("hidden"),w.textContent=`Page ${t.page}`,p.disabled=t.page===1,g.disabled=t.repos.length<t.perPage}p.addEventListener("click",async()=>{t.page!==1&&(i({page:t.page-1}),await f())});g.addEventListener("click",async()=>{i({page:t.page+1}),await f()});
