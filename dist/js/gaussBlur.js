!function(){"use strict";(window.player||(window.player={})).blurImg=function(t,a){var e=t.width,r=t.height,o=document.createElement("canvas"),n=o.getContext("2d");o.width=40,o.height=40,n.drawImage(t,0,0,e,r,0,0,40,40);var i=n.getImageData(0,0,40,40);!function(t){var a,e,r,o,n,i,h,g,d,f,w=t.data,c=t.width,u=t.height,m=[],l=0,s=10;for(i=1/(5*Math.sqrt(2*Math.PI)),n=-.02,h=0,a=-s;a<=s;a++,h++)o=i*Math.exp(n*a*a),l+=m[h]=o;for(h=0,f=m.length;h<f;h++)m[h]/=l;for(e=0;e<u;e++)for(a=0;a<c;a++){for(r=o=n=i=0,l=0,g=-s;g<=s;g++)0<=(d=a+g)&&d<c&&(r+=w[h=4*(e*c+d)]*m[g+s],o+=w[h+1]*m[g+s],n+=w[h+2]*m[g+s],l+=m[g+s]);w[h=4*(e*c+a)]=r/l,w[h+1]=o/l,w[h+2]=n/l}for(a=0;a<c;a++)for(e=0;e<u;e++){for(r=o=n=i=0,l=0,g=-s;g<=s;g++)0<=(d=e+g)&&d<u&&(r+=w[h=4*(d*c+a)]*m[g+s],o+=w[h+1]*m[g+s],n+=w[h+2]*m[g+s],l+=m[g+s]);w[h=4*(e*c+a)]=r/l,w[h+1]=o/l,w[h+2]=n/l}}(i),n.putImageData(i,0,0);var h=o.toDataURL();a.css("background-image","url("+h+")")}}(window.Zepto);