var BlockFractal=function(t){var e={};function r(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(i,n,function(e){return t[e]}.bind(null,n));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/bin/",r(r.s=11)}([function(t,e,r){"use strict";function i(t){for(var r in t)e.hasOwnProperty(r)||(e[r]=t[r])}Object.defineProperty(e,"__esModule",{value:!0}),i(r(9)),i(r(8)),i(r(7)),i(r(6)),i(r(5)),i(r(4)),i(r(3)),i(r(2)),i(r(1))},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(0),n=new i.Offset;function o(t,e){for(var r=0,i=t.length;r<i;){var n=r+i>>>1;t[n]<e?r=n+1:i=n}t.splice(r,0,e)}var s=function(){function t(t,e){this.start=new i.Offset,void 0!==t&&this.start.copyFrom(t),void 0===e&&(e=new Array),this.segments=e}return t.prototype.toString=function(){return this.start.toString()+":"+this.segments.map(function(t){return i.directionToString(t)}).join("")},t.prototype.getIsClosed=function(){n.copyFrom(this.start);for(var t=0,e=this.segments;t<e.length;t++){var r=e[t];n.addDirection(r)}return this.start.equals(n)},t.prototype.getOffsets=function(t){var e=new i.Offset;e.copyFrom(this.start),t(e);for(var r=0,n=this.segments;r<n.length;r++){var o=n[r];e.addDirection(o),t(e)}},t.prototype.getBounds=function(){var t=this.start.y,e=t,r=this.start.x,o=r;n.copyFrom(this.start);for(var s=0,h=this.segments;s<h.length;s++){var u=h[s];switch(n.addDirection(u),u){case i.Direction.NORTH:t=Math.min(t,n.y);break;case i.Direction.EAST:o=Math.max(o,n.x);break;case i.Direction.SOUTH:e=Math.max(e,n.y);break;case i.Direction.WEST:r=Math.min(r,n.x)}}return new i.Rectangle(r,t,o-r+1,e-t+1)},t.prototype.getArea=function(){var t=0;n.copyFrom(this.start);for(var e=0,r=this.segments;e<r.length;e++){var o=r[e];switch(n.addDirection(o),o){case i.Direction.NORTH:t-=n.x;break;case i.Direction.SOUTH:t+=n.x}}return Math.abs(t)},t.prototype.rasterize=function(t){var e=new Array;void 0===t&&(t=this.getBounds()),n.copyFrom(this.start);for(var r=t.northY,s=r+t.height-1,h=r;h<s;h++)e.push([]);n.copyFrom(this.start);for(var u=0,a=this.segments;u<a.length;u++){var c=a[u];c===i.Direction.SOUTH&&o(e[n.y-r],n.x),n.addDirection(c),c===i.Direction.NORTH&&o(e[n.y-r],n.x)}return new i.RasterMask({westX:t.westX,northY:t.northY,width:t.width-1,height:t.height-1},e)},t}();e.Path=s},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(0),n=function(){function t(t,e){this.northWest=new i.Offset(t.westX,t.northY),this.size=new i.Size(t.width,t.height),this._lines=e}return t.prototype.toString=function(){for(var t="",e=0;e<this.height;e++){for(var r=this._lines[e],i=this.westX,n=0;n<r.length;n+=2){for(var o=r[n],s=r[n+1];i<o;)t+="∙",i++;for(;i<s;)t+="█",i++}for(;i<=this.eastX;)t+="∙",i++;t+="\n"}return this.northWest+"\n"+t},Object.defineProperty(t.prototype,"northY",{get:function(){return this.northWest.y},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"southY",{get:function(){return this.northWest.y+this.size.height-1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"westX",{get:function(){return this.northWest.x},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"eastX",{get:function(){return this.northWest.x+this.size.width-1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){return this.size.width},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this.size.height},enumerable:!0,configurable:!0}),t.prototype.get=function(t,e){if(e<this.northY||e>this.southY)return!1;for(var r=this._lines[e-this.northY],i=0;i<r.length;i+=2)if(t>=r[i]&&t<r[i+1])return!0;return!1},t.prototype.bandsAt=function(t,e){if(!(t<this.northY||t>this.southY))for(var r=this._lines[t-this.northY],i=0;i<r.length;i+=2)e(r[i],r[i+1]-1)},t}();e.RasterMask=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(0),n=new i.Offset,o=function(){function t(t,e,r){void 0===e&&(e=!1),void 0===r&&(r=!1),this._rectangle=new i.Rectangle,this._rectangle.copyFrom(t),this._mask=new i.Mask(t,e),this._outsideValue=r}return t.prototype.toString=function(){return this._rectangle.northWest+"/"+this._outsideValue+"\n"+this._mask},Object.defineProperty(t.prototype,"westX",{get:function(){return this._rectangle.westX},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"northY",{get:function(){return this._rectangle.northY},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){return this._rectangle.width},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this._rectangle.height},enumerable:!0,configurable:!0}),t.prototype.index=function(t){return this._mask.index(n.copyFrom(t).subtractOffset(this._rectangle.northWest))},t.prototype.getAt=function(t){return this._mask.getAt(t)},t.prototype.get=function(t){return this._rectangle.containsOffset(t)?this._mask.getAt(this._rectangle.index(t)):this._outsideValue},t.prototype.setAt=function(t,e){return this._mask.setAt(t,e),this},t.prototype.set=function(t,e){return this._mask.setAt(this._rectangle.index(t),e),this},t}();e.MaskRect=o},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(0),n=function(){function t(t,e){void 0===e&&(e=!1),this._size=new i.Size,this._size.copyFrom(t),this._bits=new Array(Math.ceil(this._size.area/32)).fill(e?4294967295:0)}return t.prototype.toString=function(){for(var t="",e=new i.Offset,r=0;r<this._size.height;r++){for(var n=0;n<this._size.width;n++)e.set(n,r),t+=this.get(e.set(n,r))?"☑":"☐";t+="\n"}return t},Object.defineProperty(t.prototype,"width",{get:function(){return this._size.width},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this._size.height},enumerable:!0,configurable:!0}),t.prototype.index=function(t){return this._size.index(t)},t.prototype.getAt=function(t){var e=t>>>5,r=1<<(31&t);return 0!=(this._bits[e]&r)},t.prototype.get=function(t){return this.getAt(this.index(t))},t.prototype.setAt=function(t,e){var r=t>>>5,i=1<<(31&t);return e?this._bits[r]|=i:this._bits[r]&=~i,this},t.prototype.set=function(t,e){return this.setAt(this.index(t),e)},t}();e.Mask=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(0),n=new i.Offset,o=function(){function t(t,e,r,n){void 0===t&&(t=0),void 0===e&&(e=0),void 0===r&&(r=0),void 0===n&&(n=0),this.northWest=new i.Offset(t,e),this.size=new i.Size(r,n)}return t.prototype.toString=function(){return"("+this.westX+","+this.northY+" "+this.width+"x"+this.height+")"},t.prototype.equals=function(t){return this.westX===t.westX&&this.northY===t.northY&&this.size.equals(t)},Object.defineProperty(t.prototype,"northY",{get:function(){return this.northWest.y},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"southY",{get:function(){return this.northWest.y+this.size.height-1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"westX",{get:function(){return this.northWest.x},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"eastX",{get:function(){return this.northWest.x+this.size.width-1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){return this.size.width},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this.size.height},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"empty",{get:function(){return this.size.empty},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"area",{get:function(){return this.size.area},enumerable:!0,configurable:!0}),t.prototype.set=function(t,e,r,i){return this.northWest.set(t,e),this.size.set(r,i),this},t.prototype.copyFrom=function(t){return this.northWest.set(t.westX,t.northY),this.size.set(t.width,t.height),this},t.prototype.extendToInclude=function(t){var e=t.x-this.westX;e<0?(this.size.width-=e,this.northWest.x=t.x):e>=this.size.width&&(this.size.width=e+1);var r=t.y-this.northWest.y;return r<0?(this.size.height-=r,this.northWest.y=t.y):r>=this.size.height&&(this.size.height=r+1),this},t.prototype.containsOffset=function(t){return this.size.containsOffset(n.copyFrom(t).subtractOffset(this.northWest))},t.prototype.containsRectangle=function(t){return n.set(t.westX,t.northY).subtractOffset(this.northWest),!!this.size.containsOffset(n)&&((0!==t.width||0!==t.height)&&this.size.containsOffset(n.add(t.width-1,t.height-1)))},t.prototype.overlapsRectangle=function(t){return this.northY<=t.northY+t.height-1&&this.southY>=t.northY&&this.westX<=t.westX+t.width-1&&this.eastX>=t.westX&&!this.empty&&0!==t.width&&0!==t.height},t.prototype.index=function(t){return this.size.index(n.copyFrom(t).subtractOffset(this.northWest))},t}();e.Rectangle=o},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this.width=t,this.height=e}return t.prototype.toString=function(){return"("+this.width+"x"+this.height+")"},t.prototype.equals=function(t){return this.width===t.width&&this.height===t.height},Object.defineProperty(t.prototype,"empty",{get:function(){return 0===this.width||0===this.height},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"area",{get:function(){return this.width*this.height},enumerable:!0,configurable:!0}),t.prototype.set=function(t,e){return this.width=t,this.height=e,this},t.prototype.copyFrom=function(t){return this.width=t.width,this.height=t.height,this},t.prototype.add=function(t,e){return this.width+=t,this.height+=e,this},t.prototype.addOffset=function(t){return this.width+=t.x,this.height+=t.y,this},t.prototype.multiply=function(t){return this.width*=t,this.height*=t,this},t.prototype.containsOffset=function(t){return t.x>=0&&t.y>=0&&t.x<this.width&&t.y<this.height},t.prototype.index=function(t){return t.y*this.width+t.x},t}();e.Size=i},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=[0,1,0,-1],n=[-1,0,1,0],o=function(){function t(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this.x=t,this.y=e}return t.prototype.toString=function(){return"("+this.x+","+this.y+")"},t.prototype.equals=function(t){return this.x===t.x&&this.y===t.y},Object.defineProperty(t.prototype,"magnitudeChebyshev",{get:function(){return Math.max(Math.abs(this.x),Math.abs(this.y))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"magnitudeManhattan",{get:function(){return Math.abs(this.x)+Math.abs(this.y)},enumerable:!0,configurable:!0}),t.prototype.set=function(t,e){return this.x=t,this.y=e,this},t.prototype.copyFrom=function(t){return this.x=t.x,this.y=t.y,this},t.prototype.setFromDirection=function(t){return this.x=i[t],this.y=n[t],this},t.prototype.add=function(t,e){return this.x+=t,this.y+=e,this},t.prototype.addSize=function(t){return this.x+=t.width,this.y+=t.height,this},t.prototype.addOffset=function(t){return this.x+=t.x,this.y+=t.y,this},t.prototype.addDirection=function(t){return this.x+=i[t],this.y+=n[t],this},t.prototype.addCardinalDirection=function(t){return this.x+=i[t],this.y+=n[t],this},t.prototype.subtractOffset=function(t){return this.x-=t.x,this.y-=t.y,this},t.prototype.multiply=function(t){return this.x*=t,this.y*=t,this},t.prototype.distanceChebyshev=function(t){return this.subtractOffset(t).magnitudeChebyshev},t.prototype.distanceManhattan=function(t){return this.subtractOffset(t).magnitudeManhattan},t}();e.Offset=o},function(t,e,r){"use strict";var i;Object.defineProperty(e,"__esModule",{value:!0}),function(t){t[t.NONE=0]="NONE",t[t.NORTH=1]="NORTH",t[t.EAST=2]="EAST",t[t.SOUTH=4]="SOUTH",t[t.WEST=8]="WEST",t[t.ALL=15]="ALL"}(i=e.DirectionFlags||(e.DirectionFlags={})),e.directionFlagsToString=function(t){var e="[";return 0!=(t&i.NORTH)&&(e+="N"),0!=(t&i.EAST)&&(e+="E"),0!=(t&i.SOUTH)&&(e+="S"),0!=(t&i.WEST)&&(e+="W"),e+"]"},e.directionFlagsFromDirection=function(t){return 1<<t}},function(t,e,r){"use strict";var i;Object.defineProperty(e,"__esModule",{value:!0}),function(t){t[t.NORTH=0]="NORTH",t[t.EAST=1]="EAST",t[t.SOUTH=2]="SOUTH",t[t.WEST=3]="WEST"}(i=e.Direction||(e.Direction={})),e.DIRECTIONS=[i.NORTH,i.EAST,i.SOUTH,i.WEST];var n=["N","E","S","W"];e.directionToString=function(t){return n[t]},e.directionOpposite=function(t){return t+2&3}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(0);function n(t,e){return t.length>1&&t[t.length-2].equals(e)}function o(t,e,r){n(t,r)?e.set(t.splice(t.length-1,1)[0],!1):(t.push(r),e.set(r,!0))}function s(t,e,r,s,h,u,a,c){for(var f=2*a.x,p=c.y-a.y,y=function(a){var c=new i.Offset(f,a+p);if(n(s,c))return h.set(s.splice(s.length-1,1)[0],!1),"continue";if(u===t.length-2&&h.get(c)){for(var y=s.findIndex(function(t){return t.equals(c)}),d=0,g=s.splice(0,y);d<g.length;d++){var l=g[d];h.set(l,!1)}return o(s,h,c),"break"}if(e()<r){var b=2*Math.floor(2*e())-1,O=new i.Offset(f+b,a),v=new i.Offset(f+b,a+p);h.get(v)||h.get(O)&&!n(s,O)||(o(s,h,O),o(s,h,v))}o(s,h,c)},d=2*a.y;d!==2*c.y;d+=p){if("break"===y(d))break}}function h(t,e,r,s,h,u,a,c){for(var f=2*a.y,p=c.x-a.x,y=function(a){var c=new i.Offset(a+p,f);if(n(s,c))return h.set(s.splice(s.length-1,1)[0],!1),"continue";if(u===t.length-2&&h.get(c)){for(var y=s.findIndex(function(t){return t.equals(c)}),d=0,g=s.splice(0,y);d<g.length;d++){var l=g[d];h.set(l,!1)}return o(s,h,c),"break"}if(e()<r){var b=2*Math.floor(2*e())-1,O=new i.Offset(a,f+b),v=new i.Offset(a+p,f+b);h.get(v)||h.get(O)&&!n(s,O)||(o(s,h,O),o(s,h,v))}o(s,h,c)},d=2*a.x;d!==2*c.x;d+=p){if("break"===y(d))break}}function u(t,e,r,n){for(var u=new Array,a=new i.Rectangle(2*r.westX-1,2*r.northY-1,2*r.width+2,2*r.height+2),c=new i.MaskRect(a),f=0;f<e.length-1;f++){var p=e[f],y=e[f+1];0===f&&o(u,c,new i.Offset(2*p.x,2*p.y)),p.x===y.x?s(e,t,n,u,c,f,p,y):h(e,t,n,u,c,f,p,y)}return{points:u,bounds:a}}e.makeBlockFractal=function(t){var e,r=t.random,n=t.shape,o=t.variation;void 0===r&&(r=Math.random),void 0===n&&(n=new i.Path({x:-1,y:-1},[i.Direction.EAST,i.Direction.EAST,i.Direction.SOUTH,i.Direction.SOUTH,i.Direction.WEST,i.Direction.WEST,i.Direction.NORTH,i.Direction.NORTH])),void 0===o&&(o=.4);var s=new Array,h=n.getBounds();n.getOffsets(function(t){s.push(new i.Offset(t.x,t.y))});for(var a=0;a<t.iterations;a++)e=u(r,s,h,o),s=e.points,h=e.bounds;for(var c=new Array,f=0;f<s.length-1;f++){var p=s[f],y=s[f+1];y.y===p.y-1?c.push(i.Direction.NORTH):y.x===p.x+1?c.push(i.Direction.EAST):y.y===p.y+1?c.push(i.Direction.SOUTH):y.x===p.x-1&&c.push(i.Direction.WEST)}return new i.Path(s[0],c)}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(10);e.makeBlockFractal=i.makeBlockFractal;var n=r(0);e.Direction=n.Direction,e.DirectionFlags=n.DirectionFlags,e.Offset=n.Offset,e.Path=n.Path,e.RasterMask=n.RasterMask}]);
//# sourceMappingURL=block-fractal-1.0.0.js.map