import Slider from '../components/slider/index.svelte'
import HistoryChart from '../components/history_chart/index.svelte'
import * as d3Scale from 'd3-scale'
import * as d3Shape from 'd3-shape'
import Quiz from './quiz.js'

const d3 = Object.assign({}, d3Scale, d3Shape)

const $ = sel => document.querySelector(sel)
const $$ = sel => [].slice.apply(document.querySelectorAll(sel))

console.log(Slider)

const container = $('.oly-container')
const width = container.clientWidth || container.getBoundingClientRect().width

let neverPlayed = true


const slot = $('#interactive-slot-1')
const chartContainer = document.createElement('div')
chartContainer.classList.add('oly-chart-container')
slot.appendChild(chartContainer)

//const chartContainer = $('.oly-chart-container')
const chartWidth = chartContainer.clientWidth || chartContainer.getBoundingClientRect().width

const chartPadding = { top: 24, right : 0, bottom : 24, left : 0 }

const xScale = d3.scaleLinear()
	.domain([0, 24])
	.range([chartPadding.left, chartWidth - chartPadding.right])

const editions = [1924, 1928, 1932, 1936, 1940, 1944, 1948, 1952,
				1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988,
				1992, 1994, 1998, 2002, 2006, 2010, 2014, 2018]

const mobile = window.matchMedia('(max-width: 450px)').matches

const yScale = d3.scaleLinear()
	.domain([0, 50])
	.range([300 - chartPadding.top, chartPadding.bottom])

const areaGen = d3.area()
	.x(d => d[0])
	.y0(300-chartPadding.bottom)
	.y1(d => d[1])
	.defined(d => !isNaN(d[1]))

const quiz = new Quiz('gender-slider')

quiz.getSummary().then( summ => {

	const slider = new Slider({
		target : container,
		data : {
			width,
			height : 180,
			mobile,
			x : width/2,
			answered : false,
			touched : false,
			quiz, summ
		}
	})

}).catch (err => {

	const slider = new Slider({
		target : container,
		data : {
			width,
			height : 180,
			mobile,
			x : width/2,
			answered : false,
			touched : false,
			quiz, summ : 53
		}
	})


})

const chart = new HistoryChart({
	target : chartContainer,
	data : {
		width : chartWidth,
		height : 300,
		mobile,
		padding : chartPadding,
		xScale, yScale, areaGen, editions
	}
})

window.addEventListener('scroll', () => {

	if(chartContainer.getBoundingClientRect().top < window.innerHeight/2 && neverPlayed) {
			neverPlayed = false
			chart.draw()
		}

	})