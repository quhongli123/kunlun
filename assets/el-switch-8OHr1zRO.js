import{e as d,g as y,o as c,c as p,b as _,l as g,a7 as w,ay as u,h as S,f as E,i as k,w as o,j as l,F as z,k as b,m as C,t as N,E as B,n as D,p as I,q as L}from"./index-CbNAIyHS.js";/* empty css                  */import{_ as q}from"./_plugin-vue_export-helper-DlAUqK2U.js";const V=["xlink:href","fill"],$=d({__name:"index",props:{prefix:{type:String,default:"icon"},iconClass:{type:String,required:!1,default:""},color:{type:String,default:""},size:{type:String,default:"1em"}},setup(e){const n=e,a=y(()=>`#${n.prefix}-${n.iconClass}`);return(r,i)=>(c(),p("svg",{"aria-hidden":"true",class:"svg-icon",style:w("width:"+e.size+";height:"+e.size)},[_("use",{"xlink:href":g(a),fill:e.color},null,8,V)],4))}}),F=q($,[["__scopeId","data-v-73782c74"]]),O=d({__name:"index",props:{size:{type:String,required:!1}},setup(e){const n=[{label:"中文",value:u.ZH_CN},{label:"English",value:u.EN}],a=S(),{locale:r,t:i}=E();function m(t){r.value=t,a.changeLanguage(t),B.success(i("langSelect.message.success"))}return(t,M)=>{const f=F,h=D,x=I,v=L;return c(),k(v,{trigger:"click",onCommand:m},{dropdown:o(()=>[l(x,null,{default:o(()=>[(c(),p(z,null,b(n,s=>l(h,{key:s.value,disabled:g(a).language===s.value,command:s.value},{default:o(()=>[C(N(s.label),1)]),_:2},1032,["disabled","command"])),64))]),_:1})]),default:o(()=>[_("div",null,[l(f,{"icon-class":"language",size:e.size},null,8,["size"])])]),_:1})}}});export{F as _,O as a};
