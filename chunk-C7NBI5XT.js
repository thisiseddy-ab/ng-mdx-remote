import{a as X,b as F,c as _,d as q,e as b,f as Q,g as St,h as _t}from"./chunk-CQVAQ55I.js";import{a as gt,b as Y}from"./chunk-NGMUA4L4.js";import"./chunk-RO3B3EJX.js";import"./chunk-CC42F4JY.js";import"./chunk-CCJAG5I3.js";import"./chunk-BZUL2CAN.js";import{a as kt}from"./chunk-JPQTZ3GI.js";import{A as bt,e as R,g as lt,m as w,t as vt,u as xt,y as wt}from"./chunk-G7BBE3HQ.js";import{F as P,G as yt,Ga as G,J as ae,Ja as ct,Na as dt,Oa as pt,Ta as K,Ua as J,b as ee,c as re,eb as Lt,h as y,i as ft,k as mt,nb as U}from"./chunk-KD4BWX4B.js";import{g as ot,h as H}from"./chunk-BQWXLU4Q.js";var Z={normal:ne,vee:se,undirected:ie};function Tt(r){Z=r}function ne(r,e,t,n){var a=r.append("marker").attr("id",e).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerUnits","strokeWidth").attr("markerWidth",8).attr("markerHeight",6).attr("orient","auto"),s=a.append("path").attr("d","M 0 0 L 10 5 L 0 10 z").style("stroke-width",1).style("stroke-dasharray","1,0");_(s,t[n+"Style"]),t[n+"Class"]&&s.attr("class",t[n+"Class"])}function se(r,e,t,n){var a=r.append("marker").attr("id",e).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerUnits","strokeWidth").attr("markerWidth",8).attr("markerHeight",6).attr("orient","auto"),s=a.append("path").attr("d","M 0 0 L 10 5 L 0 10 L 4 5 z").style("stroke-width",1).style("stroke-dasharray","1,0");_(s,t[n+"Style"]),t[n+"Class"]&&s.attr("class",t[n+"Class"])}function ie(r,e,t,n){var a=r.append("marker").attr("id",e).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerUnits","strokeWidth").attr("markerWidth",8).attr("markerHeight",6).attr("orient","auto"),s=a.append("path").attr("d","M 0 5 L 10 5").style("stroke-width",1).style("stroke-dasharray","1,0");_(s,t[n+"Style"]),t[n+"Class"]&&s.attr("class",t[n+"Class"])}function Et(r,e){var t=r;return t.node().appendChild(e.label),_(t,e.labelStyle),t}function Nt(r,e){for(var t=r.append("text"),n=oe(e.label).split(`
`),a=0;a<n.length;a++)t.append("tspan").attr("xml:space","preserve").attr("dy","1em").attr("x","1").text(n[a]);return _(t,e.labelStyle),t}function oe(r){for(var e="",t=!1,n,a=0;a<r.length;++a)if(n=r[a],t){switch(n){case"n":e+=`
`;break;default:e+=n}t=!1}else n==="\\"?t=!0:e+=n;return e}function W(r,e,t){var n=e.label,a=r.append("g");e.labelType==="svg"?Et(a,e):typeof n!="string"||e.labelType==="html"?Q(a,e):Nt(a,e);var s=a.node().getBBox(),i;switch(t){case"top":i=-e.height/2;break;case"bottom":i=e.height/2-s.height;break;default:i=-s.height/2}return a.attr("transform","translate("+-s.width/2+","+i+")"),a}var O=function(r,e){var t=e.nodes().filter(function(s){return X(e,s)}),n=r.selectAll("g.cluster").data(t,function(s){return s});b(n.exit(),e).style("opacity",0).remove();var a=n.enter().append("g").attr("class","cluster").attr("id",function(s){var i=e.node(s);return i.id}).style("opacity",0).each(function(s){var i=e.node(s),o=y(this);y(this).append("rect");var c=o.append("g").attr("class","label");W(c,i,i.clusterLabelPos)});return n=n.merge(a),n=b(n,e).style("opacity",1),n.selectAll("rect").each(function(s){var i=e.node(s),o=y(this);_(o,i.style)}),n};function Ct(r){O=r}var tt=function(r,e){var t=r.selectAll("g.edgeLabel").data(e.edges(),function(a){return F(a)}).classed("update",!0);t.exit().remove(),t.enter().append("g").classed("edgeLabel",!0).style("opacity",0),t=r.selectAll("g.edgeLabel"),t.each(function(a){var s=y(this);s.select(".label").remove();var i=e.edge(a),o=W(s,e.edge(a),0).classed("label",!0),c=o.node().getBBox();i.labelId&&o.attr("id",i.labelId),w(i,"width")||(i.width=c.width),w(i,"height")||(i.height=c.height)});var n;return t.exit?n=t.exit():n=t.selectAll(null),b(n,e).style("opacity",0).remove(),t};function At(r){tt=r}function ut(r,e){return r.intersect(e)}var et=function(r,e,t){var n=r.selectAll("g.edgePath").data(e.edges(),function(i){return F(i)}).classed("update",!0),a=ue(n,e);he(n,e);var s=n.merge!==void 0?n.merge(a):n;return b(s,e).style("opacity",1),s.each(function(i){var o=y(this),c=e.edge(i);c.elem=this,c.id&&o.attr("id",c.id),q(o,c.class,(o.classed("update")?"update ":"")+"edgePath")}),s.selectAll("path.path").each(function(i){var o=e.edge(i);o.arrowheadId=wt("arrowhead");var c=y(this).attr("marker-end",function(){return"url("+ce(location.href,o.arrowheadId)+")"}).style("fill","none");b(c,e).attr("d",function(d){return de(e,d)}),_(c,o.style)}),s.selectAll("defs *").remove(),s.selectAll("defs").each(function(i){var o=e.edge(i),c=t[o.arrowhead];c(y(this),o.arrowheadId,o,"arrowhead")}),s};function It(r){et=r}function ce(r,e){var t=r.split("#")[0];return t+"#"+e}function de(r,e){var t=r.edge(e),n=r.node(e.v),a=r.node(e.w),s=t.points.slice(1,t.points.length-1);return s.unshift(ut(n,s[0])),s.push(ut(a,s[s.length-1])),Bt(t,s)}function Bt(r,e){var t=(yt||mt.line)().x(function(n){return n.x}).y(function(n){return n.y});return(t.curve||t.interpolate)(r.curve),t(e)}function pe(r){var e=r.getBBox(),t=r.ownerSVGElement.getScreenCTM().inverse().multiply(r.getScreenCTM()).translate(e.width/2,e.height/2);return{x:t.e,y:t.f}}function ue(r,e){var t=r.enter().append("g").attr("class","edgePath").style("opacity",0);return t.append("path").attr("class","path").attr("d",function(n){var a=e.edge(n),s=e.node(n.v).elem,i=xt(a.points.length).map(function(){return pe(s)});return Bt(a,i)}),t.append("defs"),t}function he(r,e){var t=r.exit();b(t,e).style("opacity",0).remove()}var rt=function(r,e,t){var n=e.nodes().filter(function(i){return!X(e,i)}),a=r.selectAll("g.node").data(n,function(i){return i}).classed("update",!0);a.exit().remove(),a.enter().append("g").attr("class","node").style("opacity",0),a=r.selectAll("g.node"),a.each(function(i){var o=e.node(i),c=y(this);q(c,o.class,(c.classed("update")?"update ":"")+"node"),c.select("g.label").remove();var d=c.append("g").attr("class","label"),l=W(d,o),m=t[o.shape],p=vt(l.node().getBBox(),"width","height");o.elem=this,o.id&&c.attr("id",o.id),o.labelId&&d.attr("id",o.labelId),w(o,"width")&&(p.width=o.width),w(o,"height")&&(p.height=o.height),p.width+=o.paddingLeft+o.paddingRight,p.height+=o.paddingTop+o.paddingBottom,d.attr("transform","translate("+(o.paddingLeft-o.paddingRight)/2+","+(o.paddingTop-o.paddingBottom)/2+")");var u=y(this);u.select(".label-container").remove();var f=m(u,p,o).classed("label-container",!0);_(f,o.style);var v=f.node().getBBox();o.width=v.width,o.height=v.height});var s;return a.exit?s=a.exit():s=a.selectAll(null),b(s,e).style("opacity",0).remove(),a};function Mt(r){rt=r}function Dt(r,e){var t=r.filter(function(){return!y(this).classed("update")});function n(a){var s=e.node(a);return"translate("+s.x+","+s.y+")"}t.attr("transform",n),b(r,e).style("opacity",1).attr("transform",n),b(t.selectAll("rect"),e).attr("width",function(a){return e.node(a).width}).attr("height",function(a){return e.node(a).height}).attr("x",function(a){var s=e.node(a);return-s.width/2}).attr("y",function(a){var s=e.node(a);return-s.height/2})}function Pt(r,e){var t=r.filter(function(){return!y(this).classed("update")});function n(a){var s=e.edge(a);return w(s,"x")?"translate("+s.x+","+s.y+")":""}t.attr("transform",n),b(r,e).style("opacity",1).attr("transform",n)}function Rt(r,e){var t=r.filter(function(){return!y(this).classed("update")});function n(a){var s=e.node(a);return"translate("+s.x+","+s.y+")"}t.attr("transform",n),b(r,e).style("opacity",1).attr("transform",n)}function at(r,e,t,n){var a=r.x,s=r.y,i=a-n.x,o=s-n.y,c=Math.sqrt(e*e*o*o+t*t*i*i),d=Math.abs(e*t*i/c);n.x<a&&(d=-d);var l=Math.abs(e*t*o/c);return n.y<s&&(l=-l),{x:a+d,y:s+l}}function Gt(r,e,t){return at(r,e,e,t)}function Wt(r,e,t,n){var a,s,i,o,c,d,l,m,p,u,f,v,h,g,L;if(a=e.y-r.y,i=r.x-e.x,c=e.x*r.y-r.x*e.y,p=a*t.x+i*t.y+c,u=a*n.x+i*n.y+c,!(p!==0&&u!==0&&Ut(p,u))&&(s=n.y-t.y,o=t.x-n.x,d=n.x*t.y-t.x*n.y,l=s*r.x+o*r.y+d,m=s*e.x+o*e.y+d,!(l!==0&&m!==0&&Ut(l,m))&&(f=a*o-s*i,f!==0)))return v=Math.abs(f/2),h=i*d-o*c,g=h<0?(h-v)/f:(h+v)/f,h=s*c-a*d,L=h<0?(h-v)/f:(h+v)/f,{x:g,y:L}}function Ut(r,e){return r*e>0}function E(r,e,t){var n=r.x,a=r.y,s=[],i=Number.POSITIVE_INFINITY,o=Number.POSITIVE_INFINITY;e.forEach(function(f){i=Math.min(i,f.x),o=Math.min(o,f.y)});for(var c=n-r.width/2-i,d=a-r.height/2-o,l=0;l<e.length;l++){var m=e[l],p=e[l<e.length-1?l+1:0],u=Wt(r,t,{x:c+m.x,y:d+m.y},{x:c+p.x,y:d+p.y});u&&s.push(u)}return s.length?(s.length>1&&s.sort(function(f,v){var h=f.x-t.x,g=f.y-t.y,L=Math.sqrt(h*h+g*g),M=v.x-t.x,N=v.y-t.y,st=Math.sqrt(M*M+N*N);return L<st?-1:L===st?0:1}),s[0]):(console.log("NO INTERSECTION FOUND, RETURN NODE CENTER",r),r)}function V(r,e){var t=r.x,n=r.y,a=e.x-t,s=e.y-n,i=r.width/2,o=r.height/2,c,d;return Math.abs(s)*i>Math.abs(a)*o?(s<0&&(o=-o),c=s===0?0:o*a/s,d=o):(a<0&&(i=-i),c=i,d=a===0?0:i*s/a),{x:t+c,y:n+d}}var nt={rect:ve,ellipse:xe,circle:we,diamond:be};function Vt(r){nt=r}function ve(r,e,t){var n=r.insert("rect",":first-child").attr("rx",t.rx).attr("ry",t.ry).attr("x",-e.width/2).attr("y",-e.height/2).attr("width",e.width).attr("height",e.height);return t.intersect=function(a){return V(t,a)},n}function xe(r,e,t){var n=e.width/2,a=e.height/2,s=r.insert("ellipse",":first-child").attr("x",-e.width/2).attr("y",-e.height/2).attr("rx",n).attr("ry",a);return t.intersect=function(i){return at(t,n,a,i)},s}function we(r,e,t){var n=Math.max(e.width,e.height)/2,a=r.insert("circle",":first-child").attr("x",-e.width/2).attr("y",-e.height/2).attr("r",n);return t.intersect=function(s){return Gt(t,n,s)},a}function be(r,e,t){var n=e.width*Math.SQRT2/2,a=e.height*Math.SQRT2/2,s=[{x:0,y:-a},{x:-n,y:0},{x:0,y:a},{x:n,y:0}],i=r.insert("polygon",":first-child").attr("points",s.map(function(o){return o.x+","+o.y}).join(" "));return t.intersect=function(o){return E(t,s,o)},i}function ht(){var r=function(e,t){_e(t);var n=$(e,"output"),a=$(n,"clusters"),s=$(n,"edgePaths"),i=tt($(n,"edgeLabels"),t),o=rt($(n,"nodes"),t,nt);kt(t),Rt(o,t),Pt(i,t),et(s,t,Z);var c=O(a,t);Dt(c,t),Le(t)};return r.createNodes=function(e){return arguments.length?(Mt(e),r):rt},r.createClusters=function(e){return arguments.length?(Ct(e),r):O},r.createEdgeLabels=function(e){return arguments.length?(At(e),r):tt},r.createEdgePaths=function(e){return arguments.length?(It(e),r):et},r.shapes=function(e){return arguments.length?(Vt(e),r):nt},r.arrows=function(e){return arguments.length?(Tt(e),r):Z},r}var ke={paddingLeft:10,paddingRight:10,paddingTop:10,paddingBottom:10,rx:0,ry:0,shape:"rect"},Se={arrowhead:"normal",curve:P};function _e(r){r.nodes().forEach(function(e){var t=r.node(e);!w(t,"label")&&!r.children(e).length&&(t.label=e),w(t,"paddingX")&&R(t,{paddingLeft:t.paddingX,paddingRight:t.paddingX}),w(t,"paddingY")&&R(t,{paddingTop:t.paddingY,paddingBottom:t.paddingY}),w(t,"padding")&&R(t,{paddingLeft:t.padding,paddingRight:t.padding,paddingTop:t.padding,paddingBottom:t.padding}),R(t,ke),lt(["paddingLeft","paddingRight","paddingTop","paddingBottom"],function(n){t[n]=Number(t[n])}),w(t,"width")&&(t._prevWidth=t.width),w(t,"height")&&(t._prevHeight=t.height)}),r.edges().forEach(function(e){var t=r.edge(e);w(t,"label")||(t.label=""),R(t,Se)})}function Le(r){lt(r.nodes(),function(e){var t=r.node(e);w(t,"_prevWidth")?t.width=t._prevWidth:delete t.width,w(t,"_prevHeight")?t.height=t._prevHeight:delete t.height,delete t._prevWidth,delete t._prevHeight})}function $(r,e){var t=r.select("g."+e);return t.empty()&&(t=r.append("g").attr("class",e)),t}var Ar=ot(ee(),1),Ir=ot(re(),1),Br=ot(ae(),1);function $t(r,e,t){let n=e.width,a=e.height,s=(n+a)*.9,i=[{x:s/2,y:0},{x:s,y:-s/2},{x:s/2,y:-s},{x:0,y:-s/2}],o=A(r,s,s,i);return t.intersect=function(c){return E(t,i,c)},o}function zt(r,e,t){let a=e.height,s=a/4,i=e.width+2*s,o=[{x:s,y:0},{x:i-s,y:0},{x:i,y:-a/2},{x:i-s,y:-a},{x:s,y:-a},{x:0,y:-a/2}],c=A(r,i,a,o);return t.intersect=function(d){return E(t,o,d)},c}function Ht(r,e,t){let n=e.width,a=e.height,s=[{x:-a/2,y:0},{x:n,y:0},{x:n,y:-a},{x:-a/2,y:-a},{x:0,y:-a/2}],i=A(r,n,a,s);return t.intersect=function(o){return E(t,s,o)},i}function Yt(r,e,t){let n=e.width,a=e.height,s=[{x:-2*a/6,y:0},{x:n-a/6,y:0},{x:n+2*a/6,y:-a},{x:a/6,y:-a}],i=A(r,n,a,s);return t.intersect=function(o){return E(t,s,o)},i}function Xt(r,e,t){let n=e.width,a=e.height,s=[{x:2*a/6,y:0},{x:n+a/6,y:0},{x:n-2*a/6,y:-a},{x:-a/6,y:-a}],i=A(r,n,a,s);return t.intersect=function(o){return E(t,s,o)},i}function Ft(r,e,t){let n=e.width,a=e.height,s=[{x:-2*a/6,y:0},{x:n+2*a/6,y:0},{x:n-a/6,y:-a},{x:a/6,y:-a}],i=A(r,n,a,s);return t.intersect=function(o){return E(t,s,o)},i}function qt(r,e,t){let n=e.width,a=e.height,s=[{x:a/6,y:0},{x:n-a/6,y:0},{x:n+2*a/6,y:-a},{x:-2*a/6,y:-a}],i=A(r,n,a,s);return t.intersect=function(o){return E(t,s,o)},i}function Qt(r,e,t){let n=e.width,a=e.height,s=[{x:0,y:0},{x:n+a/2,y:0},{x:n,y:-a/2},{x:n+a/2,y:-a},{x:0,y:-a}],i=A(r,n,a,s);return t.intersect=function(o){return E(t,s,o)},i}function Kt(r,e,t){let n=e.height,a=e.width+n/4,s=r.insert("rect",":first-child").attr("rx",n/2).attr("ry",n/2).attr("x",-a/2).attr("y",-n/2).attr("width",a).attr("height",n);return t.intersect=function(i){return V(t,i)},s}function Jt(r,e,t){let n=e.width,a=e.height,s=[{x:0,y:0},{x:n,y:0},{x:n,y:-a},{x:0,y:-a},{x:0,y:0},{x:-8,y:0},{x:n+8,y:0},{x:n+8,y:-a},{x:-8,y:-a},{x:-8,y:0}],i=A(r,n,a,s);return t.intersect=function(o){return E(t,s,o)},i}function Zt(r,e,t){let n=e.width,a=n/2,s=a/(2.5+n/50),i=e.height+s,o="M 0,"+s+" a "+a+","+s+" 0,0,0 "+n+" 0 a "+a+","+s+" 0,0,0 "+-n+" 0 l 0,"+i+" a "+a+","+s+" 0,0,0 "+n+" 0 l 0,"+-i,c=r.attr("label-offset-y",s).insert("path",":first-child").attr("d",o).attr("transform","translate("+-n/2+","+-(i/2+s)+")");return t.intersect=function(d){let l=V(t,d),m=l.x-t.x;if(a!=0&&(Math.abs(m)<t.width/2||Math.abs(m)==t.width/2&&Math.abs(l.y-t.y)>t.height/2-s)){let p=s*s*(1-m*m/(a*a));p!=0&&(p=Math.sqrt(p)),p=s-p,d.y-t.y>0&&(p=-p),l.y+=p}return l},c}function Ne(r){r.shapes().question=$t,r.shapes().hexagon=zt,r.shapes().stadium=Kt,r.shapes().subroutine=Jt,r.shapes().cylinder=Zt,r.shapes().rect_left_inv_arrow=Ht,r.shapes().lean_right=Yt,r.shapes().lean_left=Xt,r.shapes().trapezoid=Ft,r.shapes().inv_trapezoid=qt,r.shapes().rect_right_inv_arrow=Qt}function Ce(r){r({question:$t}),r({hexagon:zt}),r({stadium:Kt}),r({subroutine:Jt}),r({cylinder:Zt}),r({rect_left_inv_arrow:Ht}),r({lean_right:Yt}),r({lean_left:Xt}),r({trapezoid:Ft}),r({inv_trapezoid:qt}),r({rect_right_inv_arrow:Qt})}function A(r,e,t,n){return r.insert("polygon",":first-child").attr("points",n.map(function(a){return a.x+","+a.y}).join(" ")).attr("transform","translate("+-e/2+","+t/2+")")}var Ae={addToRender:Ne,addToRenderV2:Ce},Ot={},Ie=function(r){let e=Object.keys(r);for(let t of e)Ot[t]=r[t]},jt=function(r,e,t,n,a,s){return H(this,null,function*(){let i=n?n.select(`[id="${t}"]`):y(`[id="${t}"]`),o=a||document,c=Object.keys(r);for(let d of c){let l=r[d],m="default";l.classes.length>0&&(m=l.classes.join(" "));let p=J(l.styles),u=l.text!==void 0?l.text:l.id,f;if(ct(U().flowchart.htmlLabels)){let g={label:yield dt(u.replace(/fa[blrs]?:fa-[\w-]+/g,L=>`<i class='${L.replace(":"," ")}'></i>`),U())};f=Q(i,g).node(),f.parentNode.removeChild(f)}else{let g=o.createElementNS("http://www.w3.org/2000/svg","text");g.setAttribute("style",p.labelStyle.replace("color:","fill:"));let L=u.split(pt.lineBreakRegex);for(let M of L){let N=o.createElementNS("http://www.w3.org/2000/svg","tspan");N.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),N.setAttribute("dy","1em"),N.setAttribute("x","1"),N.textContent=M,g.appendChild(N)}f=g}let v=0,h="";switch(l.type){case"round":v=5,h="rect";break;case"square":h="rect";break;case"diamond":h="question";break;case"hexagon":h="hexagon";break;case"odd":h="rect_left_inv_arrow";break;case"lean_right":h="lean_right";break;case"lean_left":h="lean_left";break;case"trapezoid":h="trapezoid";break;case"inv_trapezoid":h="inv_trapezoid";break;case"odd_right":h="rect_left_inv_arrow";break;case"circle":h="circle";break;case"ellipse":h="ellipse";break;case"stadium":h="stadium";break;case"subroutine":h="subroutine";break;case"cylinder":h="cylinder";break;case"group":h="rect";break;default:h="rect"}G.warn("Adding node",l.id,l.domId),e.setNode(s.db.lookUpDomId(l.id),{labelType:"svg",labelStyle:p.labelStyle,shape:h,label:f,rx:v,ry:v,class:m,style:p.style,id:s.db.lookUpDomId(l.id)})}})},te=function(r,e,t){return H(this,null,function*(){let n=0,a,s;if(r.defaultStyle!==void 0){let i=J(r.defaultStyle);a=i.style,s=i.labelStyle}for(let i of r){n++;let o="L-"+i.start+"-"+i.end,c="LS-"+i.start,d="LE-"+i.end,l={};i.type==="arrow_open"?l.arrowhead="none":l.arrowhead="normal";let m="",p="";if(i.style!==void 0){let u=J(i.style);m=u.style,p=u.labelStyle}else switch(i.stroke){case"normal":m="fill:none",a!==void 0&&(m=a),s!==void 0&&(p=s);break;case"dotted":m="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":m=" stroke-width: 3.5px;fill:none";break}l.style=m,l.labelStyle=p,i.interpolate!==void 0?l.curve=K(i.interpolate,P):r.defaultInterpolate!==void 0?l.curve=K(r.defaultInterpolate,P):l.curve=K(Ot.curve,P),i.text===void 0?i.style!==void 0&&(l.arrowheadStyle="fill: #333"):(l.arrowheadStyle="fill: #333",l.labelpos="c",ct(U().flowchart.htmlLabels)?(l.labelType="html",l.label=`<span id="L-${o}" class="edgeLabel L-${c}' L-${d}" style="${l.labelStyle}">${yield dt(i.text.replace(/fa[blrs]?:fa-[\w-]+/g,u=>`<i class='${u.replace(":"," ")}'></i>`),U())}</span>`):(l.labelType="text",l.label=i.text.replace(pt.lineBreakRegex,`
`),i.style===void 0&&(l.style=l.style||"stroke: #333; stroke-width: 1.5px;fill:none"),l.labelStyle=l.labelStyle.replace("color:","fill:"))),l.id=o,l.class=c+" "+d,l.minlen=i.length||1,e.setEdge(t.db.lookUpDomId(i.start),t.db.lookUpDomId(i.end),l,n)}})},Be=function(r,e){return G.info("Extracting classes"),e.db.getClasses()},Me=function(r,e,t,n){return H(this,null,function*(){G.info("Drawing flowchart");let{securityLevel:a,flowchart:s}=U(),i;a==="sandbox"&&(i=y("#i"+e));let o=a==="sandbox"?y(i.nodes()[0].contentDocument.body):y("body"),c=a==="sandbox"?i.nodes()[0].contentDocument:document,d=n.db.getDirection();d===void 0&&(d="TD");let l=s.nodeSpacing||50,m=s.rankSpacing||50,p=new bt({multigraph:!0,compound:!0}).setGraph({rankdir:d,nodesep:l,ranksep:m,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}}),u,f=n.db.getSubGraphs();for(let x=f.length-1;x>=0;x--)u=f[x],n.db.addVertex(u.id,u.title,"group",void 0,u.classes);let v=n.db.getVertices();G.warn("Get vertices",v);let h=n.db.getEdges(),g=0;for(g=f.length-1;g>=0;g--){u=f[g],ft("cluster").append("text");for(let x=0;x<u.nodes.length;x++)G.warn("Setting subgraph",u.nodes[x],n.db.lookUpDomId(u.nodes[x]),n.db.lookUpDomId(u.id)),p.setParent(n.db.lookUpDomId(u.nodes[x]),n.db.lookUpDomId(u.id))}yield jt(v,p,e,o,c,n),yield te(h,p,n);let L=new ht;Ae.addToRender(L),L.arrows().none=function(S,T,k,D){let I=S.append("marker").attr("id",T).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerUnits","strokeWidth").attr("markerWidth",8).attr("markerHeight",6).attr("orient","auto").append("path").attr("d","M 0 0 L 0 0 L 0 0 z");_(I,k[D+"Style"])},L.arrows().normal=function(S,T){S.append("marker").attr("id",T).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerUnits","strokeWidth").attr("markerWidth",8).attr("markerHeight",6).attr("orient","auto").append("path").attr("d","M 0 0 L 10 5 L 0 10 z").attr("class","arrowheadPath").style("stroke-width",1).style("stroke-dasharray","1,0")};let M=o.select(`[id="${e}"]`),N=o.select("#"+e+" g");for(L(N,p),N.selectAll("g.node").attr("title",function(){return n.db.getTooltip(this.id)}),n.db.indexNodes("subGraph"+g),g=0;g<f.length;g++)if(u=f[g],u.title!=="undefined"){let x=c.querySelectorAll("#"+e+' [id="'+n.db.lookUpDomId(u.id)+'"] rect'),S=c.querySelectorAll("#"+e+' [id="'+n.db.lookUpDomId(u.id)+'"]'),T=x[0].x.baseVal.value,k=x[0].y.baseVal.value,D=x[0].width.baseVal.value,I=y(S[0]).select(".label");I.attr("transform",`translate(${T+D/2}, ${k+14})`),I.attr("id",e+"Text");for(let it=0;it<u.classes.length;it++)S[0].classList.add(u.classes[it])}if(!s.htmlLabels){let x=c.querySelectorAll('[id="'+e+'"] .edgeLabel .label');for(let S of x){let T=S.getBBox(),k=c.createElementNS("http://www.w3.org/2000/svg","rect");k.setAttribute("rx",0),k.setAttribute("ry",0),k.setAttribute("width",T.width),k.setAttribute("height",T.height),S.insertBefore(k,S.firstChild)}}Lt(p,M,s.diagramPadding,s.useMaxWidth),Object.keys(v).forEach(function(x){let S=v[x];if(S.link){let T=o.select("#"+e+' [id="'+n.db.lookUpDomId(x)+'"]');if(T){let k=c.createElementNS("http://www.w3.org/2000/svg","a");k.setAttributeNS("http://www.w3.org/2000/svg","class",S.classes.join(" ")),k.setAttributeNS("http://www.w3.org/2000/svg","href",S.link),k.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),a==="sandbox"?k.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):S.linkTarget&&k.setAttributeNS("http://www.w3.org/2000/svg","target",S.linkTarget);let D=T.insert(function(){return k},":first-child"),z=T.select(".label-container");z&&D.append(function(){return z.node()});let I=T.select(".label");I&&D.append(function(){return I.node()})}}})})},De={setConf:Ie,addVertices:jt,addEdges:te,getClasses:Be,draw:Me},Pr={parser:gt,db:Y,renderer:St,styles:_t,init:r=>{r.flowchart||(r.flowchart={}),r.flowchart.arrowMarkerAbsolute=r.arrowMarkerAbsolute,De.setConf(r.flowchart),Y.clear(),Y.setGen("gen-1")}};export{Pr as diagram};
