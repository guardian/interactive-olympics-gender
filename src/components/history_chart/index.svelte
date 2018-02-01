<svg width={{width}} height={{300}} on:click='draw()' class='oly-chart'>

	<pattern id='oly-hatch' patternUnits='userSpaceOnUse'
	patternTransform='rotate(45 0 0)'
	width='3' height='3'>
		<line x1='0' x2='0' y1='0' y2='6'></line>
	</pattern>

	<clipPath id='oly-mask'> <rect x={{padding.left}} width={{maskW}} y={{padding.top}} height={{height-padding.top-padding.bottom}}></rect> </clipPath>

<text x={{padding.left }} y={{padding.top - 8}} class='oly-ceiling__label'>50%</text>

{{ #each years as y, i }}

	{{ #if [4, 5].indexOf(i) < 0 }}

	<line x1={{xScale(i)}} x2={{xScale(i)}} y1={{padding.top}} y2={{height-padding.bottom}}
	class='oly-year-line'></line>

	{{ /if }}

	{{ #if [ 0, 3, 6, 9, 14, 20, 24 ].indexOf(i) >= 0 }}

		<text class='oly-year__label'
		x={{xScale(i)}} y={{height-8}}
		text-anchor={{y === 1924 ? 'begin' : ( y === 2018 ? 'end' : 'middle' ) }}> {{ [3, 6, 9, 14, 20].indexOf(i) >= 0 && true ? "'" + String(y).slice(2) : y }} </text>

	{{ /if }}

{{ /each }}

<circle cx={{ xScale(0) }} cy={{yScale(vals[0])}} r='6' class='{{ drawing ? "oly-startdot oly-startdot--hidden" : "oly-startdot" }}'></circle>

<path d={{ areaGen(vals.map((v, i) => [ xScale(i), yScale(v) ] )) }}
	class='oly-data-line' clip-path='url(#oly-mask)'>  </path>

<text x={{ xScale(0) + 10 }} y={{ yScale(vals[0]) + 4 }}

	class='{{ drawing ? "oly-ratio oly-ratio--initial oly-ratio--hidden" : "oly-ratio oly-ratio--initial" }}'>
	{{vals[0]}}%
</text>

<text class='{{ drawn ? "oly-ratio" : "oly-ratio oly-ratio--hidden" }}'
	x={{ xScale(24) - 4 }}
	y={{ yScale(vals.slice(-1)[0]) - 4 }}

>{{vals.slice(-1)[0]}}%</text>

<text class='{{ drawn ? "oly-women" : "oly-women oly-women--hidden" }}' x={{xScale(23)}} y={{yScale(10)}}>Women</text>

<rect class='oly-war-box'
x={{ xScale(3) }} y={{ padding.top }}
width={{ xScale(6) - xScale(3) }} height={{ height - padding.bottom - padding.top }} fill='url(#oly-hatch)'></rect>

<text class='oly-not-held' y={{ yScale(40) }}>
	<tspan x={{mobile ? xScale(3.65) : xScale(4)}} dy='0'>Not</tspan>
	<tspan x={{mobile ? xScale(3.65) : xScale(4)}} dy='16'>held</tspan>
</text>

<!-- <defs>
    <marker id="oly-arrow" viewBox="0 0 6 6" refX="3" refY="0"
        markerWidth="8" markerHeight="8">
      <path d="M 0,6 L 3,0 L 6,6 " stroke='#333' stroke-width='1' fill='none'/>
    </marker>
 </defs> -->

<line class='{{ !drawn ? "oly-ruled__line oly-ruled__line--hidden" : "oly-ruled__line"}}' x1={{xScale(16.75)}} x2={{xScale(16.75)}}
y1={{height - padding.bottom}} y2={{yScale(30)}}
> </line>

{{ #if !mobile }}

<text class='{{ !drawn ? "oly-ruled oly-ruled--hidden" : "oly-ruled"}}' y={{ yScale(40) }}>
	<tspan x={{mobile ? xScale(5) : xScale(12.2)}} y='75'>In <tspan class='oly-str'>1991</tspan>, the IOC ruled that all</tspan>
	<tspan x={{mobile ? xScale(5) : xScale(12.2)}} y='90'>future Olympic sports must be</tspan>
	<tspan x={{mobile ? xScale(5) : xScale(12.2)}} y='105'>open to women, but the rule</tspan>
	<tspan x={{mobile ? xScale(5) : xScale(12.2)}} y='120'>didn't apply to existing sports</tspan>
</text>

{{ else }}

<text class='{{ !drawn ? "oly-ruled oly-ruled--hidden" : "oly-ruled"}}' y={{ yScale(40) }}>
	<tspan x={{mobile ? xScale(6.8) : xScale(9.8)}} y='60'>In <tspan class='oly-str'>1991</tspan>, the IOC ruled that</tspan>
	<tspan x={{mobile ? xScale(6.8) : xScale(9.8)}} y='75'>all future Olympic sports</tspan>
	<tspan x={{mobile ? xScale(6.8) : xScale(9.8)}} y='90'>must be open to women,</tspan>
	<tspan x={{mobile ? xScale(6.8) : xScale(9.8)}} y='105'>but the rule didn't apply to</tspan>
	<tspan x={{mobile ? xScale(6.8) : xScale(9.8)}} y='120'>
	existing sports
	</tspan>
</text>

{{ /if }}

<line x1={{0}} x2={{width}} y1={{padding.top}} y2={{padding.top}} class='oly-ceiling'></line>
<line x1={{0}} x2={{width}} y1={{padding.top + (height-padding.top-padding.bottom)*0.5}} y2={{padding.top + (height-padding.top-padding.bottom)*0.5}} class='oly-mid'></line>

<line x1={{0}} x2={{width}} y1={{height-padding.bottom}} y2={{height-padding.bottom}} class='oly-base'>

</line>

</svg>

<script>


	import { tween } from 'svelte-extras'

	export default {

		data() {

			const years = [ 1924, 1928, 1932, 1936, 1940, 1944, 1948,
			1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984,
			1988, 1992, 1994, 1998, 2002, 2006, 2010, 2014, 2018 ]

			const vals = [ 4.3, 5.6, 8.3, 12, NaN, NaN, 11.5, 15.7, 17, 21.5, 18.3,
			18.2, 20.5, 20.6, 21.7, 21.5, 21.2, 27.1, 30, 36.2, 36.9, 38.2,
			40.7, 40.3, 44 ]

			return { years, vals, maskW : 0 }

		},

		methods : {


			draw : function() {

				this.set({ 'drawing' : true })

				const that = this

				tween.call(this, "maskW", this.get('width') - this.get('padding').left - this.get('padding').right,
					{
						duration : 1800,
						easing : t => t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0

					}).then(function() {

						this.set({ drawn : true })

					}.bind(this))
			}


		},

		helpers : {

			serialise : points => {

                return points.length === 0 ? '' : `M${points[0].join(',')} ${points.slice(1).filter(([x, y]) => !isNaN(y)).map(p => 'L' + p.join(',')).join(' ')}`
			}
		}

	}

</script>
