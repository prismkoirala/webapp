<template>
   <div class="center">
       
<section class="hero-navigator">
	<div class="inner">
		<div class="hero-blend1"></div>
		<div class="hero-image">
			<img src="https://images.northropandjohnson.com/?i=2019/10/KING_BABY_Hi-4013-credit-Quin-BISSET.jpg?w=1460&amp;h=621&amp;fit=crop&amp;q=60">
		</div>
		<div class="hero-blend2">
			<img src="https://images.northropandjohnson.com/?i=2019/10/KING_BABY_Hi-4013-credit-Quin-BISSET.jpg?w=1460&amp;h=621&amp;fit=crop&amp;q=60">
		</div>
		
		<div class="hero-content">
			<div class="hero-content_inner">
				<!-- <i class="hero_icon nj-icon"><svg viewBox="0 0 182.53 129.48"><path id="Path_28" data-name="Path 28" class="cls-1" d="M182.13,56.82a21.62,21.62,0,0,0-10.51-14.45c3-.62,5.48-1.7,6-3.09,1-2.52-.53-3.48-2.75-3.61s-3.2,1.67-5.1,2.44c-2.63,1.09-5.62.61-8.5.12-.56-.1-1.1-.2-1.66-.27a6.27,6.27,0,0,0-.86-.09,23.8,23.8,0,0,0-4.92,0q-8.43,1-11.94,6.27a10.09,10.09,0,0,0-1.65,7.16c.37,2.53,2,4.62,4.85,6.26a10.27,10.27,0,0,0,7.44,1.31,8.66,8.66,0,0,0,5.76-3.7A9.69,9.69,0,0,0,159.65,49c-.13-2,0-3.29.54-4a3.46,3.46,0,0,1,3.24-1.63,12.51,12.51,0,0,1,5.25,1.9,15.79,15.79,0,0,1,7.94,10.19q1.51,6.45-2.6,12.72-6.93,10.57-19.7,10.33T120.8,66.31Q97.7,52.9,83.73,55.74c-7.44,1.51-15,5-19.5,11.3a18.22,18.22,0,0,0,4.1,25.43,19.71,19.71,0,0,0,1.74,1.11A16.44,16.44,0,0,0,81.74,95.8a13.54,13.54,0,0,0,9.09-6.09,7.74,7.74,0,0,0,1.31-6.66,8.19,8.19,0,0,0-3.92-4.93,8,8,0,0,0-6.67-.77,10.38,10.38,0,0,0-5.79,4.49c-.16.26-.45.77-.84,1.46l-.51,1c-2.24,4.33-7.22.84-8.56-2.08-5-11,7.71-18.79,16.82-19.2A36.55,36.55,0,0,1,103,68.12Q114.93,75,117.83,85.31t-2.65,18.76C106,118,86.53,119.67,71.66,116.63,46.56,111.49,20,92.72,15.9,65.83c-1.31-8.5.4-18.79,6-25.54C26.84,34.45,39.64,30,47,34.18c6,3.48,5.54,14.07,12,16a5.92,5.92,0,0,0,7.38-4,5.86,5.86,0,0,0,.24-2c-.19-4.09-5.55-7.32-8.7-9.15a4.35,4.35,0,0,1-2.21-2.46,12.34,12.34,0,0,1,.28-5,22,22,0,0,1,3.39-7.7c4.07-6.17,10.4-10,19-11.68s16.1-.55,22.41,3.11a18.49,18.49,0,0,1,8.12,8.77,10.21,10.21,0,0,1-.84,10.06A18.27,18.27,0,0,1,106.6,32a19.28,19.28,0,0,1-3,1.93,15.53,15.53,0,0,1-7.34,1.24c-4.61-.3-9.49-4.13-6-8.92,1.3-1.78-3.4-.82-3.81-.55-4.26,2.68-3.24,8.21-.36,11.35,8.81,9.57,28.38,4.8,32.84-6.88a19.45,19.45,0,0,0,.17-12.14q-3-7.94-11.8-13.08A38,38,0,0,0,89.41,0,45.86,45.86,0,0,0,70.49,3.3,29.34,29.34,0,0,0,56.64,14.37a37.74,37.74,0,0,0-5.47,16.41Q36.83,24.87,25.3,28.32A33.19,33.19,0,0,0,6.63,42.58C-6,61.89.79,87.06,15.92,102.68c24,24.74,79.92,42.12,103.09,6.82q9.11-13.83,1.3-30.61c9.67,5.19,17.76,8.39,24.2,9.61,13.16,2.46,30.36-3.54,36-16.58a28.07,28.07,0,0,0,1.6-15.11"></path></svg></i> -->
				<p class="hero_title ">NEW USER OFFER!</p>
				<p class="hero_caption">Login to get FLAT 10% Discount on every Order </p>
				<p class="hero_subtitle">EVERY ORDER!</p>
			</div>
		</div>
	</div>
</section>

    </div>

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore


@Component({
  components: {
  },
  props: {
  }
})
export default class Carousel extends Vue {
    created(){
        const loading = (this as any).$vs.loading({
            target: this.$refs.content,
            color: '#66c2d5'
          })
        
        loading.close()
    }

}
</script>

<style lang='less' scoped>

@import (css) url('https://fonts.googleapis.com/css?family=Barlow+Condensed:400,600|Roboto+Condensed:300,400|Roboto:300,500|Playfair+Display:900&display=swap');

/* Fonts */
.font-austin {
	font-family: 'Playfair Display', serif;
	font-weight:900;
	text-transform:uppercase;
}

.fontRoman {
	font-family: 'Roboto', sans-serif;
	font-weight:300;
}

.fontRoman-bold {
	font-family: 'Roboto', sans-serif;
	font-weight:700;
	-webkit-font-smoothing: antialiased;
}

.fontCondensed {
	font-family: 'Roboto Condensed', sans-serif;
	font-weight:300;
}

.fontCondensed-bold {
	font-family: 'Roboto Condensed', sans-serif;
	font-weight:400;
	//-webkit-font-smoothing: antialiased;
}

.fontSuperCondensed {
	font-family: 'Barlow Condensed', sans-serif;
	font-weight:400;
}

.fontSuperCondensed-bold {
	font-family: 'Barlow Condensed', sans-serif;
	font-weight:600;
}

html {
	@media (max-width:1460px) {
		font-size:1.095890410958904VW;
	}
	
	body {
		font-size:16px;
	}
}

@media (min-width:1000px) {
.hero-navigator {
	background:#002134;
	
	.inner {
		position:relative;
		max-width:1460px;
		margin:0 auto;
		position:relative;
		
		.hero-blend1 {
			position:relative;			
			background-color:#FF6B00;
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:auto;
			clip-path: circle(25% at top 68% left 50%);
			
			&:before {
				content:'';
				display:block;
				padding-top:percentage((621 / 1460));
			}
			
			&:after {
				content:'';
				display:block;
				background:#FF6B00;
				position:absolute;
				top:100%;
				height:30%;
				width:100%;
			}
		}
		
		.hero-blend2 {
			position:relative;			
			background-color:#FF6B00;
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:auto;
			clip-path: circle(25% at top 68% left 50%);

			img {
				width:100%;
				height:auto;
				display:block;
				mix-blend-mode:multiply;
			}//img
		}
		
		.hero-image {
			//position:absolute;
			top:0;
			left:0;
			width:100%;
			height:auto;
			
			img {
				width:100%;
				height:auto;
				display:block;
			}//img
		}//.hero-image
		
		.hero-content {
			color:white;
			position:absolute;
			width:100%;
			//transform:translate(-50%,-50%);
			top:percentage((141/621));
			height:90%;
			display:flex;
			align-items:center;
			justify-content:center;
			
			.hero-content_inner {
				text-align:center;
				transform:translateY(-6%);
				
				.hero_icon {
					width:81 / 16rem;
					display:block;
					margin:0 auto 1rem;
					
					svg {
						width:100%;
						* { fill:white; }
					}
				}//.hero_icon
				
				.hero_title {
					.fontSuperCondensed;
					text-transform:uppercase;
					font-size:50px;
					letter-spacing:.18em;
					-webkit-font-smoothing:antialiased;
				}//.hero_title
				
				.hero_subtitle {
					.font-austin;
					font-size:49 / 16rem;
					letter-spacing:.18em;
					margin-top:.7em;
				}//.hero_title
				
				.hero_caption {
					.fontSuperCondensed;
					text-transform:uppercase;
					font-size:19 / 16em;
					letter-spacing:.18em;
					margin-top:1em;
				}
			}//.hero-content_inner
		}//.hero-content
		
	}//.inner
}//.hero-navigator
}

@media (max-width:1000px) {
	.hero-navigator {
		
		.inner {
			height:475px;
			position:relative;
			
			.hero-blend1 {
				height:100%;
				clip-path: none;
    		mix-blend-mode: none;
				background:none;
				position:absolute;
				left:0;
				top:0;
				width:100%;
				
				&:before, &:after {
					width:276px;
					height:276px;
					display:block;
					content:'';
					background:#FF6B00;
					
					left:50%;
					top:50%;
					transform:translate(-50%,-50%);
					border-radius:50%;
					padding:0;
					position:absolute;
				}
				
				&:before {
					mix-blend-mode:multiply;
					opacity:.7;
				}
				
				&:after {
					//mix-blend-mode:color;
					opacity:.2;
				}
			}

			.hero-blend2 {
				display:none;
			}

			.hero-image {
				height:100%;
				
				img {
					height:100%;
					object-fit:cover;
					width:100%;
					display:block;
				}//img
			}//.hero-image
			
			.hero-content {
				color:white;
				position:absolute;
				width:100%;
				top:0;
				height:100%;
				display:flex;
				align-items:center;
				justify-content:center;

				.hero-content_inner {
					text-align:center;
					transform:translateY(-6%);

					.hero_icon {
						width:40 / 16em;
						display:block;
						margin:0 auto 1rem;

						svg {
							width:100%;
							* { fill:white; }
						}
					}//.hero_icon

					.hero_title {
						.fontSuperCondensed;
						text-transform:uppercase;
						font-size:30px;
						letter-spacing:.18em;
						-webkit-font-smoothing:antialiased;
					}//.hero_title

					.hero_subtitle {
						.font-austin;
						font-size:26 / 16em;
						letter-spacing:.18em;
						margin-top:.7em;
					}//.hero_title

					.hero_caption {
						.fontSuperCondensed;
						text-transform:uppercase;
						font-size:14 / 16em;
						letter-spacing:.18em;
						margin-top:1em;
					}
				}//.hero-content_inner
			}//.hero-content
		}//.inner
	}//.hero-navigator
}


</style>