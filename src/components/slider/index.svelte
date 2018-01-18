<svg width={{width}} height={{height}} class='oly-svg'>

	<g on:drag='setStuff({ x : event.x, dx : event.dx, dy : event.dy })'>

		<text x={{0}} y={{mobile ? height*0.7 - 36 : (height*0.7) - 40}}
		class='{{ val === 0 ? "oly-biglabel oly-biglabel--f oly-biglabel--zero" : "oly-biglabel oly-biglabel--f" }}' >{{val}}<tspan class='oly-perc' dy='{{mobile ? -35 : -40 }}' dx='2'>%</tspan></text>
	
		<text x={{width}} y={{mobile ? height*0.7 - 36 : (height*0.7) - 40}}
		class='{{ val === 100 ? "oly-biglabel oly-biglabel--m oly-biglabel--zero" : "oly-biglabel oly-biglabel--m" }}' >{{100-val}}<tspan class='oly-perc' dy='{{mobile ? -35 : -40 }}' dx='2'>%</tspan></text>

		<rect x={{0}} y={{(height*0.7)-20}} height={{40}}
		width={{ x }} class='oly-bar oly-bar--f'></rect>

		<rect x={{x}} y={{(height*0.7)-20}} height={{40}}
		width={{ width - x }} class='oly-bar oly-bar--m'></rect>

		<text x={{10}} y={{(height*0.7) + 5 }} class='{{ val <= 12 ? "oly-smalllabel oly-smalllabel--f oly-smalllabel--hidden" : "oly-smalllabel oly-smalllabel--f" }}'>Women</text>

		<text x={{width-10}} y={{(height*0.7) + 5 }} class='{{ val >= 88 ? "oly-smalllabel oly-smalllabel--m oly-smalllabel--hidden" : "oly-smalllabel oly-smalllabel--m" }}'>Men</text>

		<text x={{width/2}} y={{false ? (height*0.7) + 48 : (height*0.7) - 34}} class={{ !touched && !answered ? "oly-hint" : "oly-hint oly-hint-hidden" }}>Adjust slider</text>

		<g class='' transform='{{ `translate(${x}, ${(height*0.7)})` }}'
		>

			<line x1={{0}} x2={{0}} y1={{24}} y2={{-24}}
			class='oly-line'></line>

			<path d='M -6,-5 L -14,0 L -6,5' class='oly-drag__tri oly-drag__tri--left' display={{answered ? "none" : "block"}}></path>
			<path d='M 6,-5 L 14,0 L 6,5' class='oly-drag__tri oly-drag__tri--right' display={{answered ? "none" : "block"}}></path>

			<!--<circle 
			cx={{0}} cy={{0}} r={{60}} class='oly-drag-circle'></circle>-->
		</g>
	</g>


</svg>

<button class='oly-submit' on:click='submit(val)' disabled={{answered}}>Show me the answer</button>

	{{#if answered }}

	<div class='oly-feedback'>
	<p>
		{{{ answerText(val, touched) }}}
	</p>

	<BarChart val={{val}} width={{280}} leftSpace={{116}} readersVal={{summ}} realVal={{47}} touched={{true}} /> <!-- change back to bring back conditional 3rd bar -->

</div>

	{{/if }}

<script>

	import BarChart from './bar_chart.svelte'
	import { tween } from 'svelte-extras'

	const $ = sel => document.querySelector(sel)

	const round = (value, exp = 0) => {
		value = value.toString().split('e');
		value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
	}

	const isAndroidApp = window.location.origin === "file://" && /(android)/i.test(navigator.userAgent)

	export default {

		components : {
			BarChart
		},

		oncreate () {

			const easing = t => t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0
			const f = x => round(x*this.get('width')/100)

			// tween.call(this, "x", f(40), { duration : 800 , easing })
			// 	.then(() => tween.call(this, "x", f(60), { duration : 1600 , easing }))
			// 	.then(() => tween.call(this, "x", f(50), { duration : 800 , easing }))

		},

		computed : {
			val : (width, x) => {
				return round(x*100/width)
			}
		},

		helpers : {
			answerText : (val, touched) => {

				/*if(!touched) {
					return `<p>The percentage of female athletes has seen a slow but consistent increase over time, rising from only 4% in 1924 to over 25% in 1992, and reaching xx% in 2018.</p>
					<p>The sharpest rise was noticed in the 1990s, when female athletes started to finally gain approval to compete in traditionally male sports, such as biathlon or ice hockey.</p>`
				}*/

				if(val <= 25) {
					return `<p>The figure is actually not that low. The 1992 Winter Olympic Games pushed the proportion of female athletes above 25% with six new events for women in biathlon and short track speed skating.</p>
					<p>That number has continued to rise, reaching 40% in 2010. In 2018, the percentage of women taking part in the Games is XX%.</p>`
				} else if(val <= 40) {

					return `<p>The proportion of women at the Winter Olympic Games reached 40% in 2010, after a slow but consistent increase over time, rising from only 4% in 1924 to over 25% in 1992 . The sharpest rise was noticed in the 1990s, when female athletes started to finally gain approval to compete in traditionally male sports, such as biathlon or ice hockey.</p>

					<p>In 2018, the percentage of women taking part in the Games is XX%.</p>`
				} else if(val < 50) {

					return `<p>That’s close. The number has steadily increased, rising from 4% in 1924 to over 25% in 1992 and 40% in 2010.</p>

					<p>In 2018, the Olympic games have a total of 102 events: 49 events for men, 42 for women and seven mixed gender events. Nordic Combined is the single remaining men’s only discipline, while ski jumping is the only mixed sport with more events for men.</p>`
				} else if(val === 50) {

					return `<p>Not there yet. The percentage of female athletes has seen a slow but consistent increase over time, rising from only 4% in 1924 to over 25% in 1992, and reaching xx% in 2018.</p>

					<p>The sharpest rise was noticed in the 1990s, when female athletes started to finally gain approval to compete in traditionally male sports, such as biathlon or ice hockey.</p>`
				} /*else if(val === XX) { TODO fill in
					return `<p>Spot on. Women are competing in more Olympic sports than ever, although they are still in minority. Nordic Combined remains a men’s only discipline and ski jumping offers more events for men.</p>`
				}*/

				return `<p>Not likely to happen any time soon. While many sports have made substantial strides to ensure equal numbers of men’s and women’s events in the programme, there are still fewer women competing. Nordic Combined remains a men’s only discipline and ski jumping offers more events for men.</p>`

			}
		},

		methods : {

			submit : function(val) {
				
				if(!this.get('answered')) {

					this.set( { answered : true } )
					this.get('quiz').postAnswer(val)

				}


			},

			setStuff : function (event) {
				
				if(!this.get('answered') && !this.get('touched')) { this.set({ touched : true }) }

					if(!this.get('answered')) {
						this.set({ x : (event.x ? event.x : Math.max(0, Math.min(this.get('width'), this.get('x') + event.dx))) })
					}
			}

		},

		events : {
	      drag ( node, callback ) {
	        let lastX, lastY;

	        const svg = $('.oly-svg')

	        function handleMousedown ( event ) {

	            if (isAndroidApp && window.GuardianJSInterface.registerRelatedCardsTouch) {
	                window.GuardianJSInterface.registerRelatedCardsTouch(true);
	            }

	            //if(!this.get('touched')) { this.set({ touched : true }) }


	        	const obj = event.touches ? event.touches.item(event.touches.length - 1) : event



	          lastX = obj.clientX;
	          lastY = obj.clientY;

	          const rect = node.parentNode.getBoundingClientRect()
	          const x = obj.pageX - rect.left
	          const y = obj.pageY - rect.top
	          
	          callback.call( node, {

	            x: x,//obj.offsetX,
	            y: y//obj.offsetY
	          });

	          window.addEventListener( 'mousemove', handleMousemove );
	          window.addEventListener( 'mouseup', handleMouseup );

	          window.addEventListener('touchmove', handleMousemove)
	          window.addEventListener('touchend', handleMouseup)

	        }
	        
	        function handleMousemove ( event ) {

	        const obj = event.touches ? event.touches.item(event.touches.length - 1) : event

	          callback.call( node, {
	            dx: obj.clientX - lastX,
	            dy: obj.clientY - lastY
	          });
	          
	          lastX = obj.clientX;
	          lastY = obj.clientY;

	          event.preventDefault()

	        }
	        
	        function handleMouseup ( event ) {

	        	 if (isAndroidApp && window.GuardianJSInterface.registerRelatedCardsTouch) {
                window.GuardianJSInterface.registerRelatedCardsTouch(false);
            }


	          window.removeEventListener( 'mousemove', handleMousemove );
	          window.removeEventListener( 'mouseup', handleMouseup );

	          window.removeEventListener( 'touchmove', handleMousemove );
	          window.removeEventListener( 'touchend', handleMouseup );

	        }
	        
	        node.addEventListener('touchstart', handleMousedown);
	        node.addEventListener( 'mousedown', handleMousedown );
	        
	        return {
	          teardown () {
	            node.removeEventListener( 'mousedown', handleMousedown );
	            node.removeEventListener( 'touchstart', handleMousedown);
	          }
	        };
	      }
	    },

	}

</script>