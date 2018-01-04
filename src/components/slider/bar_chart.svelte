<svg width={{width}} height={{touched ? 84 : 58}} class='oly-fb'>
	
	{{#if touched }}

	<g transform='translate(0, 26)'>
	<text x={{leftSpace - 8}} y=0 class='oly-fb-label'>You</text>
	<rect x={{leftSpace}} y={{-14}} height={{18}} width={{val/100*(width-leftSpace)}}
	class='oly-fb-bar--f'></rect>
	<rect x={{leftSpace+val/100*(width-leftSpace)}} y={{-14}} height={{18}} width={{(1-val/100)*(width-leftSpace)}}
	class='oly-fb-bar--m'></rect>
	<text x={{ val <= 20 ? leftSpace + 4 : leftSpace + val/100*(width-leftSpace) - 4 }}
		y={{ 0 }}
		text-anchor={{ val <= 20 ? 'begin' : 'end' }}
		class='oly-tinylabel' >{{val}}%</text>
	</g>

	{{/if }}

	<g transform='{{touched ? "translate(0, 52)" : "translate(0, 26)" }}'>
	<text x={{leftSpace - 8}} y=0 class='oly-fb-label'>Guardian readers</text>
	<rect x={{leftSpace}} y={{-14}} height={{18}} width={{readersVal/100*(width-leftSpace)}}
	class='oly-fb-bar--f'></rect>
	<rect x={{leftSpace+readersVal/100*(width-leftSpace)}} y={{-14}} height={{18}} width={{(1-readersVal/100)*(width-leftSpace)}}
	class='oly-fb-bar--m'></rect>

	<text x={{ readersVal <= 20 ? leftSpace + 4 : leftSpace + readersVal/100*(width-leftSpace) - 4 }}
		y={{ 0 }}
		text-anchor={{ readersVal <= 20 ? 'begin' : 'end' }}
		class='oly-tinylabel' >{{readersVal}}%</text>

	</g>

	<g transform='{{touched ? "translate(0, 78)" : "translate(0, 52)" }}'>
	<text x={{leftSpace - 8}} y=0 class='oly-fb-label'>Actual figure</text>
	<rect x={{leftSpace}} y={{-14}} height={{18}} width={{realVal/100*(width-leftSpace)}}
	class='oly-fb-bar--f'></rect>
	<rect x={{leftSpace+realVal/100*(width-leftSpace)}} y={{-14}} height={{18}} width={{(1-realVal/100)*(width-leftSpace)}}
	class='oly-fb-bar--m'></rect>

	<rect class='oly-fb-border' width={{width-leftSpace}} height={{18}} x={{leftSpace}} y={{-14}}></rect>

	<text x={{ realVal <= 20 ? leftSpace + 4 : leftSpace + realVal/100*(width-leftSpace) - 4 }}
		y={{ 0 }}
		text-anchor={{ realVal <= 20 ? 'begin' : 'end' }}
		class='oly-tinylabel' >{{realVal}}%</text>

	</g>

</svg>