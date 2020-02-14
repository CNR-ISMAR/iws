




let shScreenVS = ```
	attribute vec2 aPos;
	uniform vec4 uVPars0;
	uniform vec4 uVPars1;
	varying vec4 vTc0;

	void main(void) {
		gl_Position = vec4( aPos * uVPars0.xy + uVPars0.zw, 0.0, 1.0 );
		vec2 tc0 = aPos.xy * 0.5 + 0.5;
		vTc0 = vec4( tc0 * uVPars1.xy + uVPars1.zw, aPos.xy );
	}
```;




let shScreenFS = ```
	precision mediump float;
	uniform vec4 uPars0;
	varying vec4 vTc0;

	void main(void) {
		gl_FragColor = uPars0;
	}
```;




let shCopyFS = ```
	precision mediump float;

	uniform vec4 uPars0; // mul color
	uniform vec4 uPars1; // add color

	uniform sampler2D sTex0;

	varying vec4 vTc0;

	void main(void) {
		gl_FragColor = texture2D( sTex0, vTc0.xy ) * uPars0 + uPars1;
	}
```;




let shParticleDrawVS = ```
	precision mediump float;

	attribute vec4 aVecA; // xy ..position in state texture <0,255>; zw .. vertex position in particle flags

	uniform sampler2D sState0; // actual particle position
	uniform sampler2D sState1; // last position

	uniform vec4 uVPars0; // xy .. tc mul, zw ..tc add
	uniform vec4 uVPars1;
	uniform vec4 uVPars2;
	uniform vec4 uVPars3; // xy .. relative shift, zw..antialiasing MAD

	varying vec4 vTc0;

	void main() {
		vec2 tc = aVecA.xy * uVPars0.xy + uVPars0.zw;
		vec4 tex0 = texture2D( sState0, tc );
		vec4 tex1 = texture2D( sState1, tc );
		vec2 posA = fract( tex0.ba + tex0.rg / 255.5 + uVPars3.xy ) * 2.0 - 1.0; // particle position in <-1.0,1.0> space
		vec2 posB = fract( tex1.ba + tex1.rg / 255.5 + uVPars3.xy ) * 2.0 - 1.0; // last particle position <-1.0,1.0> space

		vec2 dirF = posA - posB;
		vec2 dirFN = normalize( dirF ); // normalized forward direction ( from B to A )
		float d = length( dirF ); // d can be used for alpha from speed
		vec2 dirRN = vec2( dirFN.y, -dirFN.x ); // perpendicular direction (right from dirFN)

		vec2 pos = mix( posB, posA, aVecA.w * 0.003921569 ); // select posA or posB
		pos += dirRN * ( aVecA.zz * uVPars1.xy + uVPars1.zw ); // add width
#ifdef WAVES
		pos += dirFN * ( aVecA.ww * uVPars2.xy + uVPars2.zw ); // add extra length
		if( d > 0.5 || d < 0.00005 ) {
			pos.x += 10.0; // bad particle! move away!
		}
#else
		if( d > 0.5 ) {
			pos.x += 10.0;
		}
#endif
		gl_Position = vec4( pos.xy, 0, 1 );
		vTc0.x = uVPars3.z * aVecA.z + uVPars3.w;
	}
```;




let shParticleDrawFS = ```
	precision mediump float;
	uniform vec4 uPars0;
	uniform vec4 uPars1;

	varying vec4 vTc0;

	void main(void) {
		float aa = clamp( uPars1.x - abs( vTc0.r ), 0.0, 1.0 );
		gl_FragColor = uPars0 * vec4( aa );
	}
```;




let shParticleUpdateFS = ```
	precision mediump float; // highp

	uniform vec4 uPars0; // wind texture coords MAD
	uniform vec4 uPars1; // particle velocity params (computed per frame)

	uniform sampler2D sState; // last particle position
	uniform sampler2D sWind; // composited wind direction texture

	varying vec4 vTc0;

	void main(void) {
		vec4 tex0 = texture2D( sState, vTc0.xy );
		vec2 pos = tex0.ba + tex0.rg / 255.5; // decode position from last state texture
		vec2 tc = fract( pos ) * uPars0.xy + uPars0.zw; // texture coordinates to wind vectors texture // pos + uPars2.xy
		vec2 dpos = texture2D( sWind, tc ).ra * uPars1.xy + uPars1.zw; // delta position from wind
		pos = fract( pos + dpos ); // new position and wrap in interval <0.0, 1.0)
		// output new position
		gl_FragColor.rg = fract( pos * 255.0 + 0.25 / 255.0 ); // encode lo bits
		gl_FragColor.ba = pos - gl_FragColor.rg / 255.0; // encode hi bits
	}
```;
