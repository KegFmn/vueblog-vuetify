<template>
	<transition name="message-fade">
		<!-- <div class="message" :class="typeClass" role="alert" v-show="visible">
			<p> -->
				<!-- <v-icon large :color="color" small=true>{{icon}}</v-icon> -->
				  <!-- {{message}}
			</p>
		</div> -->
		<v-row class="message" :class="typeClass" role="alert" v-show="visible">
			<v-col cols="24">
				<p>
					<!-- <v-icon large :color="color" small=true>{{icon}}</v-icon> -->
				  {{message}}
				</p>
			</v-col>
		</v-row>
	</transition>
</template>

<script>
	export default {
		name: 'message',

		data() {
			return {
				visible: false,
				duration: 2000,
				message: '',
				timer: null,
				closed: false,
				// color: "",
				icon: "",
				typeClass:""
			}
		},

		watch: {
			closed(val) {
				if (val) {
					this.visible = false
					this.$el.addEventListener('transitionend', this.destroyElement)
				}
			}
		},

		methods: {
			destroyElement() {
				this.$el.removeEventListener('transitionend', this.destroyElement)
				this.$destroy(true)
				this.$el.parentNode.removeChild(this.$el)
			},

			startTimer() {
				if (this.duration > 0) {
					this.timer = setTimeout(() => {
						if (!this.closed) {
							this.close()
						}
					}, this.duration)
				}
			},

			close() {
				this.closed = true
			}
		},

		mounted() {
			// 开始定时器
			this.startTimer()
		}
	}
</script>

<style lang="scss" scoped>
	.message {
		box-sizing: border-box;
		border-radius: 5px;
		border-width: 1px;
		border-style: solid;
		position: fixed;
		left: 50%;
		top: 25px;
		transform: translateX(-50%);
		transition: opacity .3s, transform .4s;
	}

	.message--success {
		background-color: rgb(230, 255, 230);
		border-color: rgb(230, 255, 230);
		color: rgb(44, 136, 44);
	}

	.message--error {
	background-color: rgb(252, 232, 232);
	border-color: rgb(252, 232, 232);
	color: rgb(253, 85, 85);
	}

	.message p {
		margin: 0px;
		padding: 0px;
		font-size: 14px;
		line-height: 1;
	}

	.message-fade-enter,
	.message-fade-leave-active {
		opacity: 0;
		transform: translate(-50%, -100%)
	}
</style>
