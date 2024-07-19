class FacetFiltersForm extends HTMLElement{constructor(){super(),this.onActiveFilterClick=this.onActiveFilterClick.bind(this),this.debouncedOnSubmit=debounce((e=>{this.onSubmitHandler(e)}),500),this.querySelector("form").addEventListener("input",this.debouncedOnSubmit.bind(this));const e=this.querySelector(".FacetsWrapperDesktop");e&&e.addEventListener("keyup",onKeyUpEscape)}static setListeners(){window.addEventListener("popstate",(e=>{const t=e.state?e.state.searchParams:FacetFiltersForm.searchParamsInitial;t!==FacetFiltersForm.searchParamsPrev&&FacetFiltersForm.renderPage(t,null,!1)}))}static toggleActiveFacets(e=!0){document.querySelectorAll(".js-facet-remove").forEach((t=>{t.classList.toggle("disabled",e)}))}static renderPage(e,t,r=!0){FacetFiltersForm.searchParamsPrev=e;const a=FacetFiltersForm.getSections();document.getElementById("ProductCount"),document.getElementById("ProductCountDesktop");a.forEach((r=>{const a=`${window.location.pathname}?section_id=${r.section}&${e}`,n=e=>e.url===a;FacetFiltersForm.filterData.some(n)?FacetFiltersForm.renderSectionFromCache(n,t):FacetFiltersForm.renderSectionFromFetch(a,t)})),r&&FacetFiltersForm.updateURLHash(e)}static renderSectionFromFetch(e,t){fetch(e).then((e=>e.text())).then((r=>{const a=r;FacetFiltersForm.filterData=[...FacetFiltersForm.filterData,{html:a,url:e}],FacetFiltersForm.renderFilters(a,t),FacetFiltersForm.renderProductGridContainer(a)}))}static renderSectionFromCache(e,t){const r=FacetFiltersForm.filterData.find(e).html;FacetFiltersForm.renderFilters(r,t),FacetFiltersForm.renderProductGridContainer(r)}static renderProductGridContainer(e){document.getElementById("ProductGridContainer").innerHTML=(new DOMParser).parseFromString(e,"text/html").getElementById("ProductGridContainer").innerHTML,$(".selector-wrapper-1").each((function(){$(this).hasClass("opt-color.hide")&&$(this).closest(".item-product__popup--variant").find(".btn-close-quick-add").hide()})),$(".btn-quick-add").click((function(){$(".item-product__popup--variant").removeClass("act"),$(this).parent().find(".item-product__popup--variant").addClass("act"),$(this).parents(".thumbnail-container").addClass("popup-act")})),$(".btn-close-quick-add").click((function(){$(this).parent().removeClass("act"),$(this).parents(".thumbnail-container").removeClass("popup-act")}));var t=$(".collection__grid-loadmore"),r=t.data("next-url");r&&$(".collection__btn-loadmore").click((function(){$.ajax({url:r,type:"GET",dataType:"html",beforeSend:function(){$(".scroll__infinityfilter").remove(),$(".collection__btn-loadmore").addClass("loading")}}).done((function(e){var a=$(e).find(".collection__grid-loadmore"),n=a.data("next-url"),i=$(".pagination__bar").data("max");void 0!==(r=n)?$(".collection__btn-loadmore").removeClass("loading"):$(".collection__btn-loadmore").remove(),t.append(a.html()),void 0===r&&$(".scroll__infinityfilter").remove();var s=t.find(".product--item").length;$(".pagination__count .count").text(s),$(".pagination__bar .progress").css("width",s/i*100+"%"),$(".jdgm-widget").length&&jdgm.customizeBadges(),Currency.convertAll(shopCurrency,$("#currencies span.selected").attr("data-currency"))}))})),$(".jdgm-widget").length&&jdgm.customizeBadges(),Currency.convertAll(shopCurrency,$("#currencies span.selected").attr("data-currency"))}static renderFilters(e,t){const r=(new DOMParser).parseFromString(e,"text/html"),a=r.querySelectorAll("#FacetFiltersForm .js-filter"),n=e=>{const r=t?t.target.closest(".js-filter"):void 0;return!!r&&e.dataset.index===r.dataset.index},i=Array.from(a).filter((e=>!n(e))),s=Array.from(a).find(n);i.forEach((e=>{document.querySelector(`.js-filter[data-index="${e.dataset.index}"]`).innerHTML=e.innerHTML})),FacetFiltersForm.renderActiveFacets(r),s&&FacetFiltersForm.renderCounts(s,t.target.closest(".js-filter"))}static renderActiveFacets(e){[".active-facets-desktop"].forEach((t=>{const r=e.querySelector(t);r&&(document.querySelector(t).innerHTML=r.innerHTML)})),FacetFiltersForm.toggleActiveFacets(!1)}static renderCounts(e,t){const r=t.querySelector(".facets__selected");e.querySelector(".facets__selected")&&r&&(t.querySelector(".facets__selected").outerHTML=e.querySelector(".facets__selected").outerHTML)}static updateURLHash(e){history.pushState({searchParams:e},"",`${window.location.pathname}${e&&"?".concat(e)}`)}static getSections(){return[{section:document.getElementById("product-grid").dataset.id}]}onSubmitHandler(e){e.preventDefault();const t=new FormData(e.target.closest("form")),r=new URLSearchParams(t).toString();FacetFiltersForm.renderPage(r,e)}onSubmitHandlerSortBy(e,t){e.preventDefault();const r=new FormData(t),a=new URLSearchParams(r).toString();FacetFiltersForm.renderPage(a,e)}onActiveFilterClick(e){e.preventDefault(),FacetFiltersForm.toggleActiveFacets();const t=-1==e.currentTarget.href.indexOf("?")?"":e.currentTarget.href.slice(e.currentTarget.href.indexOf("?")+1);FacetFiltersForm.renderPage(t)}}FacetFiltersForm.filterData=[],FacetFiltersForm.searchParamsInitial=window.location.search.slice(1),FacetFiltersForm.searchParamsPrev=window.location.search.slice(1),customElements.define("facet-filters-form",FacetFiltersForm),FacetFiltersForm.setListeners();class PriceRange extends HTMLElement{constructor(){super(),this.querySelectorAll(".filter__price--input input").forEach((e=>e.addEventListener("change",this.onRangeChange.bind(this)))),this.setMinAndMaxValues(),this.priceRangeSlider()}onRangeChange(e){this.adjustToValidValues(e.currentTarget),this.setMinAndMaxValues()}setMinAndMaxValues(){const e=this.querySelectorAll(".filter__price--input input"),t=e[0],r=e[1];r.value&&t.setAttribute("max",r.value),t.value&&r.setAttribute("min",t.value),""===t.value&&r.setAttribute("min",0),""===r.value&&t.setAttribute("max",r.getAttribute("max"))}adjustToValidValues(e){const t=Number(e.value),r=Number(e.getAttribute("min")),a=Number(e.getAttribute("max"));t<r&&(e.value=r),t>a&&(e.value=a)}priceRangeSlider(){const e=document.querySelectorAll(".filter__price--range input"),t=document.querySelectorAll(".filter__price--input input"),r=document.querySelector(".filter__price--bar .progress");t.forEach((a=>{a.addEventListener("input",(a=>{let n=parseInt(t[0].value),i=parseInt(t[1].value);i-n>=5&&i<=e[1].max&&(t[0]&&(e[0].value=n,r.style.left=n/e[0].max*100+"%"),t[1]&&(e[1].value=i,r.style.right=100-i/e[1].max*100+"%")),n>e[1].max&&(e[0].value=0,r.style.left=0),i>e[1].max&&t[1]&&(e[1].value=e[1].max,r.style.right=0)}))})),e.forEach((a=>{let n=parseInt(t[0].value),i=parseInt(t[1].value);n>0?(e[0].value=n,r.style.left=n/e[0].max*100+"%"):(e[0].value=0,r.style.left=0),i>0?(e[1].value=i,r.style.right=100-i/e[1].max*100+"%"):(e[1].value=e[0].max,r.style.right=100-i/e[1].max*100+"%"),a.addEventListener("input",(a=>{let n=parseInt(e[0].value),i=parseInt(e[1].value);i-n<5?"field__range--min"===a.target.className?e[0].value=i-5:e[1].value=n+5:(t[0].value=n,t[1].value=i,r.style.left=n/e[0].max*100+"%",r.style.right=100-i/e[1].max*100+"%")}))}))}}customElements.define("price-range",PriceRange);class FacetRemove extends HTMLElement{constructor(){super(),this.querySelector("a").addEventListener("click",(e=>{e.preventDefault();(this.closest("facet-filters-form")||document.querySelector("facet-filters-form")).onActiveFilterClick(e)}))}}customElements.define("facet-remove",FacetRemove);