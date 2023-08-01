(function(){"use strict";var e={2978:function(e,t,a){var s=a(9242),i=a(3396);const n={key:0};function o(e,t,a,s,o,r){const c=(0,i.up)("Header"),l=(0,i.up)("router-view");return(0,i.wg)(),(0,i.iD)("div",null,[o.isLoading?((0,i.wg)(),(0,i.iD)("div",n,"Loading...")):(0,i.kq)("",!0),o.isLoaded?((0,i.wg)(),(0,i.j4)(c,{key:1})):(0,i.kq)("",!0),o.isLoaded?((0,i.wg)(),(0,i.j4)(l,{key:2})):(0,i.kq)("",!0)])}var r=a.p+"img/SPRITE.1197ef80.svg";const c=r+"#icon-shopping-cart-03",l=r+"#icon-align-justify",p=r+"#icon-x-mobile",d={class:"header"},u={class:"container animate__animated animate__fadeInDown"},m={class:"header-items"},g={class:"navigation"},h=(0,i._)("a",{href:"/",class:"logo-first"},[(0,i.Uk)("tasty"),(0,i._)("span",{class:"logo-second"},"treats.")],-1),v=(0,i._)("div",{class:"header-icons"},[(0,i._)("button",{class:"header-order-btn","aria-label":"shopping btn",type:"button",id:"imitation"},[(0,i._)("svg",{class:"shopping-icon order-btn",width:"24",height:"24"},[(0,i._)("use",{class:"shopping-icon-use",href:c})])]),(0,i._)("div",null,[(0,i._)("label",{class:"header-switch"},[(0,i._)("input",{type:"checkbox"}),(0,i._)("span",{class:"header-slider"})])]),(0,i._)("button",{class:"mob-menu-btn",type:"button"},[(0,i._)("svg",{class:"mobile-icon",width:"32",height:"32"},[(0,i._)("use",{class:"mobile-menu-icon",href:l})])])],-1),f=(0,i._)("div",{class:"mobile-menu"},[(0,i._)("button",{class:"mob-menu-btn-close",type:"button"},[(0,i._)("svg",{class:"mob-menu-close",width:"32",height:"32"},[(0,i._)("use",{class:"mob-menu-close-icon",href:p})])]),(0,i._)("ul",{class:"mob-menu-list"},[(0,i._)("li",null,[(0,i._)("a",{class:"header-list-item",href:"./index.html"},"Home")]),(0,i._)("li",null,[(0,i._)("a",{class:"header-list-item",href:"./favorites.html"},"Favorites")])]),(0,i._)("div",null,[(0,i._)("label",{class:"switch"},[(0,i._)("input",{type:"checkbox"}),(0,i._)("span",{class:"slider"})])])],-1);function w(e,t,a,s,n,o){const r=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i._)("header",d,[(0,i._)("div",u,[(0,i._)("div",m,[(0,i._)("nav",g,[(0,i.Wm)(r,{class:"header-nav-links btn-home",to:"/"},{default:(0,i.w5)((()=>[(0,i.Uk)("Home")])),_:1}),(0,i.Wm)(r,{class:"header-nav-links",to:"/about"},{default:(0,i.w5)((()=>[(0,i.Uk)("Favorites")])),_:1})]),h,v])]),f])])}var _={name:"Header"},y=a(89);const b=(0,y.Z)(_,[["render",w]]);var k=b,S=a(65),F=a(4161),L=(0,S.MT)({state:{page:1,query:"",area:"",time:"",ingredient:"",category:"",title:"",limit:6,categories:[],areas:[],ingredients:[],times:[],recipes:[],ingredientsForFiltr:[],allRicipes:[],timesFilter:[],areasFilter:[],categoriesFilter:[],ingredientsFilter:[]},getters:{},mutations:{setLimit(e,t){e.limit=t},setRecipes(e,t){e.recipes=t},set(e,{key:t,value:a}){e.hasOwnProperty(t)&&(e[t]=a)}},actions:{set({commit:e},{key:t,value:a}){e("set",{key:t,value:a})},async fetchAllIngredients({commit:e}){const t="https://tasty-treats-backend.p.goit.global/api/ingredients";try{const a=await F.Z.get(t),s=a.data,i=s.map((e=>({_id:e._id,name:e.name})));e("set",{key:"ingredientsForFiltr",value:i})}catch(a){console.log(a)}},async fetchAllRecipeValues({state:e,commit:t,dispatch:a}){this.commit("setLimit",5e3);const s="https://tasty-treats-backend.p.goit.global/api/recipes",i=s,n={category:e.category,page:e.page,limit:e.limit,time:e.time,area:e.area,ingredient:e.ingredient,title:e.title};try{const a=await F.Z.get(i,{params:n}),s=Array.from(new Set(a.data.results.map((e=>e.category)))),o=Array.from(new Set(a.data.results.map((e=>e.area)))),r=Array.from(new Set(a.data.results.flatMap((e=>e.ingredients.map((e=>e.id)))))),c=r.map((t=>{const a=e.ingredientsForFiltr.find((e=>e._id===t));return{_id:a._id,name:a.name}})),l=Array.from(new Set(a.data.results.map((e=>e.time))));t("set",{key:"allRicipes",value:a.data.results}),t("set",{key:"categories",value:s}),t("set",{key:"areas",value:o}),t("set",{key:"ingredients",value:c}),t("set",{key:"times",value:l})}catch(o){console.log(o)}},setLimitValue({state:e}){const t=window.innerWidth;return t<768?6:t<1280?8:9},async fetchRecipesAfterUpdate({state:e,commit:t,dispatch:a}){const s="https://tasty-treats-backend.p.goit.global/api/recipes",i=s,n=await a("setLimitValue"),o={category:e.category,page:e.page,limit:n,time:e.time,area:e.area,ingredient:e.ingredient,title:e.title};try{const e=await F.Z.get(i,{params:o});t("setRecipes",e.data.results),console.log(e.data.results)}catch(r){console.log(r)}finally{console.log(e.recipes)}}},modules:{}}),O={components:{Header:k},data(){return{isLoading:!0,isLoaded:!1}},mounted(){L.dispatch("fetchAllIngredients"),L.dispatch("fetchAllRecipeValues").then((()=>{this.isLoading=!1,this.isLoaded=!0,console.log(L.state)})).catch((e=>{this.isLoading=!1,console.log(e)}))}};const D=(0,y.Z)(O,[["render",o]]);var C=D,A=a(2483);const R={class:"home"};function E(e,t,a,s,n,o){const r=(0,i.up)("Hero"),c=(0,i.up)("MainSection");return(0,i.wg)(),(0,i.iD)("div",R,[(0,i.Wm)(r),(0,i.Wm)(c)])}const N={class:"event-list"},x={class:"container hero-container"},P=(0,i.uE)('<div class="event-description animate__animated animate__fadeInLeft"><h1 class="event-title"> Learn to Cook <span class="tasty-treats">Tasty Treats&#39;</span> Customizable Masterclass </h1><p class="event-text"> TastyTreats - Customize Your Meal with Ingredient Options and Step-by-Step Video Guides. </p><button type="button" class="event-order order-btn">Order now</button></div>',1),j={class:"crunch animate__animated animate__fadeInRight"},Z={class:"events swiper-wrapper"};function H(e,t,a,s,n,o){const r=(0,i.up)("Event");return(0,i.wg)(),(0,i.iD)("section",N,[(0,i._)("div",x,[P,(0,i._)("div",j,[(0,i._)("div",Z,[(0,i.Wm)(r)])])])])}var I=a(7139);const M={class:"slide"},W={class:"event"},q={class:"preview-deash-card"},z={class:"deash-name"},T={class:"deash-area"};function U(e,t,a,s,n,o){const r=(0,i.up)("swiper-slide"),c=(0,i.up)("swiper");return(0,i.wg)(),(0,i.j4)(c,{effect:"creative",creativeEffect:{prev:{shadow:!0,translate:[0,0,-400]},next:{translate:["100%",0,0]}},grabCursor:!0,loop:!0,speed:800,autoplay:{delay:2500,disableOnInteraction:!1},pagination:s.pagination,modules:s.modules,class:"mySwiper"},{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(n.events,(e=>((0,i.wg)(),(0,i.j4)(r,{key:e._id},{default:(0,i.w5)((()=>[(0,i._)("div",M,[(0,i._)("div",W,[(0,i._)("div",{class:"cook",style:(0,I.j5)({backgroundImage:`url(${e.cook.imgUrl})`})},null,4),(0,i._)("div",q,[(0,i._)("div",{class:"preview-deash",style:(0,I.j5)({backgroundImage:`url(${e.topic.previewUrl})`})},null,4),(0,i._)("p",z,(0,I.zw)(e.topic.name),1),(0,i._)("p",T,(0,I.zw)(e.topic.area),1)]),(0,i._)("div",{class:"deash",style:(0,I.j5)({backgroundImage:`url(${e.topic.previewUrl})`})},null,4)])])])),_:2},1024)))),128))])),_:1},8,["pagination","modules"])}var V=a(1008),Y=a(4528),K={name:"Event",components:{Swiper:Y.tq,SwiperSlide:Y.o5},setup(){return{modules:[V.SH,V.tl,V.pt,V.W_],pagination:{clickable:!0}}},data(){return{events:[],isEventLoading:!1}},methods:{async fetchEvent(){try{const e=await F.Z.get("https://tasty-treats-backend.p.goit.global/api/events");if(console.log(e.data),404===e.status)throw new Error(e.status);this.events=e.data}catch(e){console.log(e)}finally{this.isEventLoading=!0}}},mounted(){this.fetchEvent()}};const B=(0,y.Z)(K,[["render",U]]);var $=B,G={name:"Hero",components:{Event:$}};const J=(0,y.Z)(G,[["render",H]]);var Q=J;const X={class:"main-section"},ee={class:"container section-container"},te={class:"left-contaier animate__animated animate__fadeInLeft"},ae={class:"right-container animate__animated animate__fadeInRight"},se={class:"test"};function ie(e,t,a,s,n,o){const r=(0,i.up)("AllCategory"),c=(0,i.up)("Popular"),l=(0,i.up)("Filter"),p=(0,i.up)("AllRecipes");return(0,i.wg)(),(0,i.iD)("div",X,[(0,i._)("div",ee,[(0,i._)("div",te,[(0,i.Wm)(r),(0,i.Wm)(c)]),(0,i._)("div",ae,[(0,i._)("div",se,[(0,i.Wm)(l,{propName:"time",propsName:"times"}),(0,i.Wm)(l,{propName:"area",propsName:"areas"}),(0,i.Wm)(l,{propName:"ingredient",propsName:"ingredients"})]),(0,i.Wm)(p)])])])}const ne={key:0},oe={class:"container-popular container-popular1 animate__animated animate__fadeInDown"},re=(0,i._)("h2",{class:"popular-recipes"},"POPULAR RECIPES",-1),ce={class:"container-recipies1"},le=["id","src","alt"],pe={class:"popular-description"},de={class:"popular-title"},ue={class:"popular-text"};function me(e,t,a,s,n,o){return n.isPopularLoading?((0,i.wg)(),(0,i.iD)("div",ne,[(0,i._)("div",oe,[re,(0,i._)("div",ce,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(n.popular,(e=>((0,i.wg)(),(0,i.iD)("div",{class:"recipes",key:e._id},[(0,i._)("img",{id:e._id,class:"popular-img",src:e.preview,alt:e.title},null,8,le),(0,i._)("div",pe,[(0,i._)("h3",de,(0,I.zw)(e.title),1),(0,i._)("p",ue,(0,I.zw)(e.description),1)])])))),128))])])])):(0,i.kq)("",!0)}var ge={name:"Popular",data(){return{popular:[],isPopularLoading:!1,img:[]}},methods:{async fetchPopular(){try{const e=await F.Z.get("https://tasty-treats-backend.p.goit.global/api/recipes/popular");if(200!==e.status)throw new Error(e.status);this.popular=e.data,this.img=e.data.map((e=>e.preview)),console.log(this.img)}catch(e){console.log(e)}finally{this.isPopularLoading=!0}}},mounted(){this.fetchPopular()}};const he=(0,y.Z)(ge,[["render",me]]);var ve=he;const fe={class:"category-container"},we=(0,i._)("button",{class:"all-category-button active",id:"all-category-btn"}," All categories ",-1),_e={class:"categories-container"},ye={class:"category-list"},be={class:"category-btn"};function ke(e,t,a,s,n,o){return(0,i.wg)(),(0,i.iD)("div",fe,[we,(0,i._)("div",_e,[(0,i._)("ul",ye,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(n.catedoryes,(e=>((0,i.wg)(),(0,i.iD)("li",{class:"cat-items",key:e._id},[(0,i._)("button",be,(0,I.zw)(e.name),1)])))),128))])])])}var Se={name:"AllCategory",data(){return{catedoryes:[],isPopularLoading:!1}},methods:{async fetchCategories(){try{const e=await F.Z.get("https://tasty-treats-backend.p.goit.global/api/categories");if(console.log(e.data),404===e.status)throw new Error(e.status);this.catedoryes=e.data}catch(e){console.log(e)}}},mounted(){this.fetchCategories()}};const Fe=(0,y.Z)(Se,[["render",ke]]);var Le=Fe;const Oe={class:"container-cards"},De={class:"cards_list"};function Ce(e,t,a,s,n,o){const r=(0,i.up)("ReceptCards");return(0,i.wg)(),(0,i.iD)("div",Oe,[(0,i._)("ul",De,[(0,i.Wm)(r,{recipes:n.recipesForRender},null,8,["recipes"])])])}const Ae=r+"#icon-heart",Re=(0,i._)("button",{"aria-label":"Favorite Button",class:"card_favourites_btn button"},[(0,i._)("svg",{class:"card_heart",width:"22",height:"22",viewBox:"0 0 32 32"},[(0,i._)("use",{href:Ae})])],-1),Ee=["src"],Ne=["src"],xe={class:"card_content-container"},Pe={class:"card_text-container"},je={class:"card_title"},Ze={class:"card_description"},He={class:"card_footer-container"},Ie={class:"card_star-rating"},Me={class:"star-rating_value"},We=(0,i._)("button",{id:"{{recipe._id}}",class:"card_btn"},"See recipe",-1);function qe(e,t,a,s,n,o){const r=(0,i.up)("star");return(0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(a.recipes,(t=>((0,i.wg)(),(0,i.iD)("li",{class:"card_container",id:"{{category}}",key:t._id},[Re,t.preview?((0,i.wg)(),(0,i.iD)("img",{key:0,src:t.preview,alt:"",class:"card_background"},null,8,Ee)):((0,i.wg)(),(0,i.iD)("img",{key:1,src:e.notFound,alt:"",class:"card_background"},null,8,Ne)),(0,i._)("div",xe,[(0,i._)("div",Pe,[(0,i._)("h3",je,(0,I.zw)(t.title),1),(0,i._)("p",Ze,(0,I.zw)(t.description),1)]),(0,i._)("div",He,[(0,i._)("div",Ie,[(0,i._)("p",Me,(0,I.zw)(o.computedRating(t.rating)),1),((0,i.wg)(),(0,i.iD)(i.HY,null,(0,i.Ko)(5,(e=>(0,i.Wm)(r,{key:e,class:(0,I.C_)({filled:e<=Math.round(t.rating)})},null,8,["class"]))),64))]),We])])])))),128)}const ze=r+"#icon-Star-1",Te={class:"star",width:"12",height:"12",id:"all-stars",viewBox:"0 0 14 14"},Ue=(0,i._)("use",{href:ze},null,-1),Ve=[Ue];function Ye(e,t,a,s,n,o){return(0,i.wg)(),(0,i.iD)("svg",Te,Ve)}var Ke={name:"Star"};const Be=(0,y.Z)(Ke,[["render",Ye]]);var $e=Be,Ge={name:"ReceptCards",components:{Star:$e},props:{recipes:{type:Array,required:!0}},mounted(){Array.isArray(this.recipes)?console.log(this.recipes):console.error("Властивість recipes має бути масивом.")},methods:{computedRating(e){return Math.round(10*e)/10}}};const Je=(0,y.Z)(Ge,[["render",qe]]);var Qe=Je,Xe={name:"AllRecipes",components:{ReceptCards:Qe},data(){return{recipesForRender:[]}},computed:{...(0,S.rn)(["recipes"])},methods:{...(0,S.nv)({set:"set",fetchRecipesAfterUpdate:"fetchRecipesAfterUpdate"})},mounted(){this.fetchRecipesAfterUpdate()},watch:{recipes(e){this.recipesForRender=e}}};const et=(0,y.Z)(Xe,[["render",Ce]]);var tt=et,at=a.p+"img/x.336bb910.svg";const st=r+"#search-arrow",it={class:"item-select"},nt=(0,i._)("h2",{class:"text-search"},null,-1),ot={class:"custom-select"},rt={class:"elem-prev"},ct=(0,i._)("use",{href:st},null,-1),lt=[ct],pt={key:0,width:"18px",height:"18px",src:at},dt=["onClick"];function ut(e,t,a,n,o,r){return(0,i.wg)(),(0,i.iD)("div",it,[nt,(0,i._)("div",ot,[(0,i._)("div",{class:"selected-option",onClick:t[1]||(t[1]=(0,s.iM)((e=>"Оберіть"===o.optonForShow?r.toggleOptionsList():null),["stop"]))},[(0,i._)("span",rt,(0,I.zw)("time"===a.propName&&"Оберіть"!==o.optonForShow?o.optonForShow+" min":"ingredient"===a.propName&&"Оберіть"!==o.optonForShow?o.optonForShow.name:o.optonForShow),1),"Оберіть"===o.optonForShow?((0,i.wg)(),(0,i.iD)("svg",{key:0,class:(0,I.C_)([{active:o.showOptionsList},"search-arrow"]),width:"18px",height:"18px"},lt,2)):(0,i.kq)("",!0),(0,i._)("button",{class:"clearSelection",onClick:t[0]||(t[0]=(0,s.iM)((e=>r.clearSelection()),["stop"]))},["Оберіть"!==o.optonForShow?((0,i.wg)(),(0,i.iD)("img",pt)):(0,i.kq)("",!0)])]),(0,i.wy)((0,i._)("ul",{class:(0,I.C_)(["options-list",{active:o.showOptionsList}])},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(r.options,((e,t)=>((0,i.wg)(),(0,i.iD)("li",{key:t,class:"option"},[e?((0,i.wg)(),(0,i.iD)("button",{key:0,class:"option-item",onClick:t=>r.setSelectedOption(e)},(0,I.zw)("time"===a.propName?e+" min":"ingredient"===a.propName?e.name:e),9,dt)):(0,i.kq)("",!0)])))),128))],2),[[s.F8,o.showOptionsList&&"Оберіть"===o.optonForShow]])])])}const mt={value:"{{ name }}}"};function gt(e,t,a,s,n,o){return(0,i.wg)(),(0,i.iD)("option",mt,(0,I.zw)(a.name),1)}var ht={props:{name:{type:String,required:!0}}};const vt=(0,y.Z)(ht,[["render",gt]]);var ft=vt;function wt(e,t){return"number"===typeof e&&"number"===typeof t?e-t:String(e).localeCompare(String(t),void 0,{numeric:!0})}var _t={name:"Filter",props:["propName","propsName"],components:{DropDownList:ft},data(){return{optonForShow:"Оберіть",showOptionsList:!1,selectedOption:null}},methods:{clearSelection(){"Оберіть"!==this.optonForShow&&(this.optonForShow="Оберіть",L.dispatch("set",{key:this.propName,value:""}),this.setFilterValue(),this.setSelectedOption())},toggleOptionsList(){this.showOptionsList=!this.showOptionsList,console.log(L.state),this.showOptionsList?document.addEventListener("click",this.toggleOptionsList):document.removeEventListener("click",this.toggleOptionsList)},setSelectedOption(e){e&&(this.optonForShow=e,"ingredient"!==this.propName?L.dispatch("set",{key:this.propName,value:e}):L.dispatch("set",{key:this.propName,value:e._id}),this.setFilterValue()),L.dispatch("fetchRecipesAfterUpdate").then((()=>{this.isLoading=!1,this.isLoaded=!0})).catch((e=>{this.isLoading=!1,console.log(e)}))},setFilterValue(){const{area:e,time:t,ingredient:a,category:s}=L.state,i=L.state.allRicipes.filter((i=>(!e||i.area===e)&&((!t||i.time===t)&&(a&&!i.ingredients.some((e=>e.id===a))?(console.log("waw"),!1):(!s||i.category===s)&&!(this.query&&!i.title.toLowerCase().includes(this.query.toLowerCase()))))));console.log(i);const n=[...new Set(i.map((e=>e.area)))];console.log(n),L.dispatch("set",{key:"areasFilter",value:n});const o=[...new Set(i.map((e=>e.time)))];L.dispatch("set",{key:"timesFilter",value:o});const r=[...new Set(i.flatMap((e=>e.ingredients.map((e=>e.id)))))],c=L.state.ingredients.filter((e=>r.includes(e._id)));L.dispatch("set",{key:"ingredientsFilter",value:c});const l=[...new Set(i.map((e=>e.category)))];L.dispatch("set",{key:"categoriesFilter",value:l})}},computed:{options(){return this.optionsForSort.slice().sort(wt)},optionsForSort(){const e=this.propsName+"Filter";return L.state[e].length>0?L.state[e]:"ingredients"===this.propsName?L.state[this.propsName].slice().sort(((e,t)=>wt(e.name,t.name))):L.state[this.propsName]}}};const yt=(0,y.Z)(_t,[["render",ut]]);var bt=yt,kt={name:"MainSection",components:{Filter:bt,Popular:ve,AllCategory:Le,AllRecipes:tt}};const St=(0,y.Z)(kt,[["render",ie]]);var Ft=St,Lt={name:"HomeView",components:{Hero:Q,MainSection:Ft}};const Ot=(0,y.Z)(Lt,[["render",E]]);var Dt=Ot;const Ct=[{path:"/",name:"home",component:Dt},{path:"/about",name:"about",component:()=>a.e(443).then(a.bind(a,3268))}],At=(0,A.p7)({history:(0,A.PO)("/tasty-treats-vue/"),routes:Ct});var Rt=At;(0,s.ri)(C).use(L).use(Rt).mount("#app")}},t={};function a(s){var i=t[s];if(void 0!==i)return i.exports;var n=t[s]={exports:{}};return e[s].call(n.exports,n,n.exports,a),n.exports}a.m=e,function(){var e=[];a.O=function(t,s,i,n){if(!s){var o=1/0;for(p=0;p<e.length;p++){s=e[p][0],i=e[p][1],n=e[p][2];for(var r=!0,c=0;c<s.length;c++)(!1&n||o>=n)&&Object.keys(a.O).every((function(e){return a.O[e](s[c])}))?s.splice(c--,1):(r=!1,n<o&&(o=n));if(r){e.splice(p--,1);var l=i();void 0!==l&&(t=l)}}return t}n=n||0;for(var p=e.length;p>0&&e[p-1][2]>n;p--)e[p]=e[p-1];e[p]=[s,i,n]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var s in t)a.o(t,s)&&!a.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,s){return a.f[s](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/about.15764f91.js"}}(),function(){a.miniCssF=function(e){}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="tasty-treats-vue:";a.l=function(s,i,n,o){if(e[s])e[s].push(i);else{var r,c;if(void 0!==n)for(var l=document.getElementsByTagName("script"),p=0;p<l.length;p++){var d=l[p];if(d.getAttribute("src")==s||d.getAttribute("data-webpack")==t+n){r=d;break}}r||(c=!0,r=document.createElement("script"),r.charset="utf-8",r.timeout=120,a.nc&&r.setAttribute("nonce",a.nc),r.setAttribute("data-webpack",t+n),r.src=s),e[s]=[i];var u=function(t,a){r.onerror=r.onload=null,clearTimeout(m);var i=e[s];if(delete e[s],r.parentNode&&r.parentNode.removeChild(r),i&&i.forEach((function(e){return e(a)})),t)return t(a)},m=setTimeout(u.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=u.bind(null,r.onerror),r.onload=u.bind(null,r.onload),c&&document.head.appendChild(r)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/tasty-treats-vue/"}(),function(){var e={143:0};a.f.j=function(t,s){var i=a.o(e,t)?e[t]:void 0;if(0!==i)if(i)s.push(i[2]);else{var n=new Promise((function(a,s){i=e[t]=[a,s]}));s.push(i[2]=n);var o=a.p+a.u(t),r=new Error,c=function(s){if(a.o(e,t)&&(i=e[t],0!==i&&(e[t]=void 0),i)){var n=s&&("load"===s.type?"missing":s.type),o=s&&s.target&&s.target.src;r.message="Loading chunk "+t+" failed.\n("+n+": "+o+")",r.name="ChunkLoadError",r.type=n,r.request=o,i[1](r)}};a.l(o,c,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,s){var i,n,o=s[0],r=s[1],c=s[2],l=0;if(o.some((function(t){return 0!==e[t]}))){for(i in r)a.o(r,i)&&(a.m[i]=r[i]);if(c)var p=c(a)}for(t&&t(s);l<o.length;l++)n=o[l],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(p)},s=self["webpackChunktasty_treats_vue"]=self["webpackChunktasty_treats_vue"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=a.O(void 0,[998],(function(){return a(2978)}));s=a.O(s)})();
//# sourceMappingURL=app.b4ce19c0.js.map