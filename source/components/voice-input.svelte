<script lang="ts">
	import { MicIcon } from 'svelte-feather-icons'

	import SpeechToTextHelper from '../services/speech-to-text'

	/**
	 * The list of words we should attempt to recognize.
	 */
	export let wordList: string[]
	/**
	 * The callback fired when speech is recognized.
	 *
	 * @param {Error?} error - The error that occurred while recognizing the user's speech, if any.
	 * @param {string?} text - The text recognized from the user's speech.
	 */
	export let onInput: (error?: Error, text?: string) => void = () => {}

	// The view state
	const view = {
		state: {},
	}

	/**
	 * Begin searching by voice.
	 */
	const startVoiceSearch = () => {
		let speechToTextHelper
		try {
			// Attempt to recognize words from the list above
			speechToTextHelper = new SpeechToTextHelper(wordList)

			view.state.isListening = true

			// Start listening, and when we get a result, call the `onInput` callback
			speechToTextHelper.start((error?: Error, text?: string) => {
				view.state.isListening = false

				onInput(error, text)
			})
		} catch {
			onInput(
				new Error(
					'Could not use voice input to search as speech recognition is only supported on Google Chrome some versions of Microsoft Edge.',
				),
			)
		}
	}
</script>

<template>
	<div class="center">
		{#if view.state.isListening}
			<div>
				<img
					style="height: 4em; width: 4em"
					src="/gifs/sound.gif"
					alt="Listening..."
				/>
			</div>
		{:else}
			<div on:click={startVoiceSearch}>
				<MicIcon size="42" />
			</div>
		{/if}
	</div>
</template>

<style>
	.center {
		margin-left: 9em;
		margin-right: 9em;
		text-align: center;
	}
</style>
