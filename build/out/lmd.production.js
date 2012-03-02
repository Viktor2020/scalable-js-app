(function(a,b){var c={},d={},e=function(f){var g=c[f],h;return d[f]&&g?g:(typeof g=="string"&&(g=(0,a.eval)(g)),h={exports:{}},d[f]=1,c[f]=h.exports,g?typeof g=="function"&&(g=g(b[f]?null:e,h.exports,h)||h.exports):g=a[f],c[f]=g)},f=function(a){var b={exports:{}};switch(typeof a){case"function":a(e,b.exports,b);break;case"object":for(var g in a)d[g]=0,c[g]=a[g]}return f};return f})(window,{MessageView:!0,DataGenerator:!0})({Core:'(function(a,b){"use strict";var c=a("Template"),d=a("Sandbox"),e=a("EventManager"),f=function(a,b){return function(){return a.apply(b,arguments)}},g={descriptor:{},descriptors:{},locales:{},templates:{},sandboxes:{},init:function(b){return b=b||{},this.descriptor=b.descriptor||a("descriptor"),this.descriptor.modules=this.descriptor.modules||[],this.descriptor.layout=this.descriptor.layout||{},this.descriptors=b.descriptors||a("descriptors"),this.templates=b.templates||a("templates"),this.locales=b.locales||a("locales"),this._initModules(),this},_initModules:function(){for(var a=0,b=this.descriptor.modules.length;a<b;a++)this.initModule(this.descriptor.modules[a])},initModule:function(b){if(this.sandboxes[b])return this;var c=new d(this.descriptors[b]),e=a(b);return this.sandboxes[b]=c,new e(c),this},destroyModule:function(a){var b=this.sandboxes[a];if(b){e.trigger("destroy",null,!0,b.namespace),e.unbindAllNs(b.namespace);var c=this.getBox();c&&(c.innerHTML=""),delete this.sandboxes[a]}return this},getBox:function(a){var b=this.descriptor.layout[a];return b?document.getElementById(b):null},getTemplate:function(a,b){if(typeof this.templates[a]=="string"){var d=document.createElement("div");d.innerHTML=this.templates[a],this.templates[a]=d}var e=this._getElementById(this.templates[a],b);return c(e?e.innerHTML:"")},_getElementById:function(a,b){if(a.querySelector)return a.querySelector("#"+b);var c=a.childNodes;for(var d=0,e=c.length;d<e;d++)if(c[d].getAttribute)return c[d].getAttribute("id")===b?c[d]:this._getElementById(c[d],b);return null},getText:function(a,b){var c=this.locales[a][b];return(typeof c=="object"?c[this.descriptor.locale]:c)||b}},h={trigger:f(e.trigger,e),bind:f(e.bind,e),unbind:f(e.unbind,e),unbindAllNs:f(e.unbindAllNs,e),init:f(g.init,g),destroyModule:f(g.destroyModule,g),initModule:f(g.initModule,g),getTemplate:f(g.getTemplate,g),getText:f(g.getText,g),getBox:f(g.getBox,g)};h.on=h.bind,h.off=h.unbind;for(var i in h)b[i]=h[i]})',Template:'(function(){return function(a,b){var c=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj||{}){p.push(\'"+String(a).replace(/[\\r\\t\\n]/g," ").split("{%").join("\\t").replace(/((^|%})[^\\t]*)\'/g,"$1\\r").replace(/\\t=(.*?)%}/g,"\',$1,\'").split("\\t").join("\');").split("%}").join("p.push(\'").split("\\r").join("\\\\\'")+"\');}return p.join(\'\');");return b?c(b):c}})',EventManager:'(function(a){return{eventsNs:{},_getEventListNs:function(a,b){var c=this;return c.eventsNs[a]||(c.eventsNs[a]={}),b?(c.eventsNs[a][b]||(c.eventsNs[a][b]=[]),c.eventsNs[a][b]):c.eventsNs[a]},_parseEventsString:function(a){var b=a.split(" "),c=[];for(var d=0,e=b.length;d<e;d++)b[d]&&c.push(b[d]);return c},trigger:function(a,b,c,d){if(typeof a=="string"){a=this._parseEventsString(a);for(var e=0,f=a.length,g,h,i;e<f;e++){i=a[e],g=this._getEventListNs(i);for(var j in g){if(d&&d!==j)continue;if(g.hasOwnProperty(j)){h=g[j];for(var k=0,l=h.length,m;k<l;k++){m={type:a[e],data:b};if(c)try{h[k](m)}catch(n){}else h[k](m)}}}}}return this},bind:function(a,b,c){if(typeof a=="string"&&typeof b=="function"){c=c||"*",a=this._parseEventsString(a);for(var d=0,e=a.length;d<e;d++)this._getEventListNs(a[d],c).push(b)}return this},unbind:function(a,b,c){if(typeof a=="string"){typeof b=="string"&&typeof c=="undefined"&&(c=b,b=void 0),c=c||"*",a=this._parseEventsString(a);for(var d=0,e=a.length,f,g;d<e;d++)f=this._getEventListNs(a[d],c),b?(g=f.indexOf(b),g!==-1&&f.splice(g,1)):f.splice(0)}return this},unbindAllNs:function(a){var b;for(var c in this.eventsNs)this.eventsNs.hasOwnProperty(c)&&(b=this.eventsNs[c],b[a]&&(b[a]=[]));return this}}})',Sandbox:'(function(a){var b=a("Core"),c=a("EventManager"),d=0,e=function(a){this.descriptor=a||{},this.namespace=this.descriptor.name+ ++d};return e.prototype.getBox=function(){return b.getBox(this.descriptor.name)},e.prototype.is=function(){var a=this.descriptor.acl;if(a["*"])return!0;for(var b=0,c=arguments.length,d;b<c;b++){d=arguments[b];if(!a[d]&&!a[d.split(":")[0]+":*"])return!1}return!0},e.prototype.bind=function(a,b){return this.is("listen:"+a)&&c.bind(a,b,this.namespace),this},e.prototype.unbind=function(a,b){return this.is("listen:"+a)&&c.unbind(a,b,this.namespace),this},e.prototype.trigger=function(a,b){return this.is("trigger:"+a)&&c.trigger(a,b),this},e.prototype.getText=function(a){return b.getText(this.descriptor.name,a)},e.prototype.getResource=function(a){return this.descriptor.resources[a]},e.prototype.getTemplate=function(a){return b.getTemplate(this.descriptor.name,a)},e})',locales:{MessageView:{text_label:{ru:"Он сказал: ",en:"He said: "}},DataGenerator:{},Logger:{}},templates:{MessageView:'<div class="b-message-view" id="b-message-view">\r\n    <span class="b-message-view__label">{%=label%}</span><span class="b-message-view__value">{%=value%}</span>\r\n</div>'},descriptors:{MessageView:{name:"MessageView",acl:{"trigger:newData:display":!0,"listen:newData":!0},resources:{}},DataGenerator:{name:"DataGenerator",acl:{"trigger:newData":!0,"listen:destroy":!0},resources:{interval:1e3}},Logger:{name:"Logger",acl:{"listen:newData":!0,"listen:ready":!0},resources:{}}},descriptor:{modules:["MessageView","DataGenerator","Logger"],safe_modules:["Logger"],layout:{MessageView:"b-message-view"},locale:"ru",path:{descriptor:"./app/descriptors/",module:"./app/modules/",locale:"./app/locales/",template:"./app/templates/"}},MessageView:'(function(a,b,c){"use strict";var d=function(a){var b=this;this.sandbox=a,this.template=a.getTemplate("b-message-view"),this.label=a.getText("text_label"),this.parentElement=a.getBox(),a.bind("newData",function(a){b.update(a.data)})};return d.prototype.update=function(a){this.parentElement.innerHTML=this.template({label:this.label,value:a}),this.sandbox.trigger("newData:display")},d})',DataGenerator:'(function(a,b,c){"use strict";var d;return function(a){if(d)return;d=setInterval(function(){a.trigger("newData",Math.random())},a.getResource("interval")),a.bind("destroy",function(){clearInterval(d)})}})',Logger:'(function(a,b,c){var d=a("console").log;"use strict";var e=function(a){d(a.type,a.data)};return function(a){a.bind("newData",e),a.bind("ready",e)}})'})(function(b,c,d){"use strict",b("Core").init()})