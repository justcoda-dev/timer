;(() => {
	createTimer(document.querySelector('[data-element="container"]'))
	function createTimer($container) {
		const elements = {
			$displayWrapper: createElements({
				tag: 'div',
				attrs: {
					'data-element': 'display-wrapper',
					class: 'display-wrapper',
				},

				parent: $container,
			}),
			$displayHours: createElements({
				tag: 'div',
				attrs: {
					'data-element': 'div',
					class: 'div-hours',
				},
				text: '00:',
				parent: document.querySelector('[data-element="display-wrapper"]'),
			}),
			$displayMinutes: createElements({
				tag: 'div',
				attrs: {
					'data-element': 'div',
					class: 'div-minutes',
				},
				text: '00:',
				parent: document.querySelector('[data-element="display-wrapper"]'),
			}),
			$displaySeconds: createElements({
				tag: 'div',
				attrs: {
					'data-element': 'div',
					class: 'div-seconds',
				},
				text: '00:',
				parent: document.querySelector('[data-element="display-wrapper"]'),
			}),
			$displayMilliseconds: createElements({
				tag: 'div',
				attrs: {
					'data-element': 'div',
					class: 'div-milliseconds',
				},
				text: '000',
				parent: document.querySelector('[data-element="display-wrapper"]'),
			}),
			$buttonWrapper: createElements({
				tag: 'div',
				attrs: {
					'data-element': 'button-wrapper',
					class: 'button-wrapper',
				},
				parent: $container,
			}),
			$start: createElements({
				tag: 'button',
				attrs: {
					'data-element': 'start',
					class: 'start',
					disabled: true,
				},
				text: 'start',
				parent: document.querySelector('[data-element="button-wrapper"]'),
			}),
			$reset: createElements({
				tag: 'button',
				attrs: {
					'data-element': 'reset',
					class: 'reset',
				},
				text: 'reset',
				parent: document.querySelector('[data-element="button-wrapper"]'),
			}),
			$inputWrapper: createElements({
				tag: 'div',
				attrs: {
					'data-element': 'input-wrapper',
					class: 'input-wrapper',
				},
				parent: $container,
			}),
			$hourInp: createElements({
				tag: 'input',
				attrs: {
					'data-element': 'hourInp',
					class: 'hourInp',
					type: 'number',
					max: '24',
					placeholder: 'hours',
				},
				parent: document.querySelector('[data-element="input-wrapper"]'),
			}),
			$minuteInp: createElements({
				tag: 'input',
				attrs: {
					'data-element': 'minuteInp',
					class: 'minuteInp',
					type: 'number',
					max: '60',
					placeholder: 'minutes',
				},
				parent: document.querySelector('[data-element="input-wrapper"]'),
			}),
			$secondInp: createElements({
				tag: 'input',
				attrs: {
					'data-element': 'secondInp',
					class: 'secondInp',
					type: 'number',
					max: '60',
					placeholder: 'seconds',
				},
				parent: document.querySelector('[data-element="input-wrapper"]'),
			}),
			$millisecondInp: createElements({
				tag: 'input',
				attrs: {
					'data-element': 'millisecondInp',
					class: 'millisecondInp',
					type: 'number',
					max: '1000',
					min: '1',
					placeholder: 'milliseconds',
				},
				parent: document.querySelector('[data-element="input-wrapper"]'),
			}),
			$checkbox: createElements({
				tag: 'input',
				attrs: {
					'data-element': 'checkbox',
					class: 'checkbox',
					type: 'checkbox',
				},
				parent: $container,
			}),
			$checkboxText: createElements({
				tag: 'div',
				attrs: {
					'data-element': 'checkboxText',
					class: 'checkbox-text',
				},
				text: 'put to set time',
				parent: $container,
			}),
			$stripWrapper: createElements({
				tag: 'div',
				attrs: {
					'data-element': 'stripWrapper',
					class: 'stripWrapper',
				},

				parent: $container,
			}),
			$bottomStrip: createElements({
				tag: 'div',
				attrs: {
					'data-element': 'bottom-strip',
					class: 'bottom-strip',
				},

				parent: document.querySelector('[data-element="stripWrapper"]'),
			}),
			$topStrip: createElements({
				tag: 'div',
				attrs: {
					'data-element': 'topStrip',
					class: 'top-strip',
				},

				parent: document.querySelector('[data-element="stripWrapper"]'),
			}),
		}

		const inputValues = {
			userInpHours: 0,
			userInpMinutes: 0,
			userInpSeconds: 0,
			userInpMilliseconds: 0,
		}

		const transToMs = {
			hour: (v) => v * 1000 * 60 * 60,
			min: (v) => v * 1000 * 60,
			sec: (v) => v * 1000,
			ms: (v) => v * 1,
		}

		const state = {
			time: 0,
			intervalId: 0,
			lineTime: 0,
		}
		//  *******************************listeners************************************//
		elements.$checkbox.addEventListener('change', () => {
			if (elements.$checkbox.checked) {
				elements.$displayMilliseconds.textContent = nullsAdderMs(inputValues.userInpMilliseconds)
				elements.$displaySeconds.textContent = nullsAdder(inputValues.userInpSeconds)
				elements.$displayMinutes.textContent = nullsAdder(inputValues.userInpMinutes)
				elements.$displayHours.textContent = nullsAdder(inputValues.userInpHours)
				
				elements.$start.disabled = false
				elements.$hourInp.disabled = true
				elements.$minuteInp.disabled = true
				elements.$secondInp.disabled = true
				elements.$millisecondInp.disabled = true
				elements.$checkboxText.textContent = 'unput to change time'

				state.lineTime = transToMs.hour(inputValues.userInpHours) + transToMs.min(inputValues.userInpMinutes) + transToMs.sec(inputValues.userInpSeconds) + transToMs.ms(inputValues.userInpMilliseconds)
				state.time = transToMs.hour(inputValues.userInpHours) + transToMs.min(inputValues.userInpMinutes) + transToMs.sec(inputValues.userInpSeconds) + transToMs.ms(inputValues.userInpMilliseconds)

			} else {
				elements.$checkboxText.textContent = 'put to set time'
				elements.$start.disabled = true
				elements.$hourInp.disabled = false
				elements.$minuteInp.disabled = false
				elements.$secondInp.disabled = false
				elements.$millisecondInp.disabled = false
			}
		})

		elements.$start.addEventListener('click', () => {
			if (inputValues.userInpHours || inputValues.userInpMinutes || inputValues.userInpSeconds || inputValues.userInpMilliseconds) {
			} else {
				return alert('you should set time to start')
			}
			if (state.intervalId) {
				elements.$checkboxText.textContent = 'unput to ganche time'
				elements.$start.textContent = 'start'
				elements.$checkbox.disabled = false
				clearInterval(state.intervalId)
				state.intervalId = 0
			} else {
				elements.$checkboxText.textContent = 'put button PAUSE to anable'
				elements.$checkbox.disabled = true
				elements.$start.textContent = 'pause'
				msTimer()
			}
		})

		elements.$reset.addEventListener('click', () => {
			clearInterval(state.intervalId)
			elements.$displayHours.textContent = '00:'
			elements.$displayMinutes.textContent = '00:'
			elements.$displaySeconds.textContent = '00:'
			elements.$displayMilliseconds.textContent = '000'
			elements.$start.disabled = true
			elements.$hourInp.disabled = false
			elements.$minuteInp.disabled = false
			elements.$secondInp.disabled = false
			elements.$millisecondInp.disabled = false
			elements.$checkbox.checked = false
			elements.$checkbox.disabled = false
			state.time = 0
			state.intervalId = 0
			elements.$start.textContent = 'start'
			elements.$topStrip.style = `width:${100}%`
		})

		elements.$hourInp.addEventListener('input', () => {
			if (elements.$hourInp.value === '24') {
				elements.$checkbox.click()
			}
			if (elements.$hourInp.value > 24) {
				console.error('input hour should be less than 24')
				inputValues.userInpHours = 24
				return (elements.$hourInp.value = 24)
			} else {
				inputValues.userInpHours = elements.$hourInp.value
			}
		})

		elements.$minuteInp.addEventListener('input', () => {
			if (elements.$minuteInp.value > 59) {
				console.error('input minutes should be less than 59')
				inputValues.userInpMinutes = 59
				return (elements.$minuteInp.value = 59)
			} else {
				inputValues.userInpMinutes = elements.$minuteInp.value
			}
		})
		elements.$secondInp.addEventListener('input', () => {
			if (elements.$secondInp.value > 59) {
				console.error('input seconds should be less than 59')
				inputValues.userInpSeconds = 59
				return (elements.$secondInp.value = 59)
			} else {
				inputValues.userInpSeconds = elements.$secondInp.value
			}
		})
		elements.$millisecondInp.addEventListener('input', () => {
			if (elements.$millisecondInp.value > 1000) {
				console.error('input milliseconds should be less than 1000')
				inputValues.userInpMilliseconds = 1000
				return (elements.$millisecondInp.value = 1000)
			} else {
				inputValues.userInpMilliseconds = elements.$millisecondInp.value
			}
		})

		// ******************functions****************************************************//

		function transform(ms) {
			const milliseconds = ms % 1000
			const seconds = Math.floor(ms / 1000) % 60
			const minutes = Math.floor(Math.floor(ms / 1000) / 60) % 60
			const hours = Math.floor(Math.floor(ms / 1000 / 60) / 60) % 60

			const transformFn = (x, inMin, inMax, outMin, outMax) => ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
			elements.$topStrip.style = `width:${transformFn(ms, 0, state.lineTime, 0, 100)}%`

			elements.$displayMilliseconds.textContent = nullsAdderMs(milliseconds)
			elements.$displayMinutes.textContent = nullsAdder(minutes)
			elements.$displaySeconds.textContent = nullsAdder(seconds)
			elements.$displayHours.textContent = nullsAdder(hours)

			if (ms <= 0) {
				elements.$reset.click()
				setTimeout(() => {
					alert('час закінчився')
				}, 400)
			}
		}
		function nullsAdderMs(v) {
			if (v === 0) {
				return `00${v}`
			} else if (v < 10) {
				return `00${v}`
			} else if (v < 100) {
				return `0${v}`
			}
			return v
		}

		function nullsAdder(v) {
			if (v === '') {
				return '00:'
			}
			if (v < 10) {
				return `0${v}:`
			}
			return `${v}:`
		}

		function msTimer() {
			state.intervalId = setInterval(() => {
				state.time -= 10
				transform(state.time)
			}, 10)
		}

		function createElements(options) {
			const $el = document.createElement(options.tag)
			if (options.attrs) {
				Object.entries(options.attrs).forEach(([name, value]) => {
					$el.setAttribute(name, value)
				})
				if (options.text) {
					$el.textContent = options.text
				}
				if (options.value) {
					$el.value = options.value
				}
				options.parent.appendChild($el)
				return $el
			}
		}
	}
})()
