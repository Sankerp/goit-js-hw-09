!function(){var t=document.querySelector("body"),e=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]"),d=0;function n(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}e.addEventListener("click",(function(){0===d&&(d=setInterval(n,1e3),e.disabled=!0,a.disabled=!1)})),a.addEventListener("click",(function(t){clearInterval(d),d=0,e.disabled=!1,a.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.e1925b37.js.map
