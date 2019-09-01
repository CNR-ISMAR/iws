/*! */
W.define("GlParticlesClass", ["GlObj", "glShaders", "store", "broadcast", "render"], function(t, e, i, a, r) {
        return L.CanvasLayer.extend({
            _canvas: null,
            glo: new t,
            failed: !1,
            ratioScale: 1,
            needUpdateParams: !1,
            alpha: 0,
            needClear: !0,
            bcastRedrawLayersId: -1,
            isOk: function() {
                return 0 === this.errorCount
            },
            reinitParticleType: function(t) {
                "wind" === t ? this.prepareAlphaLUT(.2, .9, .3, .8) : "waves" === t ? this.prepareAlphaLUT(.7, 1.2, .3, 1.4) : "currents" === t && this.prepareAlphaLUT(.2, 1.2, .3, 1.4), this.particlesIdentLast = t
            },
            createGlStuff: function(t) {
                this.resetGlStuff(), this.errorCount = 0;
                this.glo.create(t, {
                    antialias: !1,
                    stencil: !1,
                    alpha: !0,
                    premultipliedAlpha: !0,
                    preserveDrawingBuffer: !1
                }, "GlParticlesContext") ? this.initParamsAndShaders() : ++this.errorCount
            },
            resetGlStuff: function() {
                this.vertexBuffer = null, this.indexBuffer = null, this.lastClientWidth = 0, this.lastClientHeight = 0, this.backTexture = null, this.backTextureWidth = 0, this.backTextureHeight = 0, this.textureState0 = null, this.textureState1 = null, this.stateRandBlocks = null
            },
            initParamsAndShaders: function() {
                var t = this.glo;
                this.stateBlocksCount = 16, this.blockTimeSegmentSize = 8, this.totalTimeFrames = this.stateBlocksCount * this.blockTimeSegmentSize, this.stateResX = 256, this.stateResY = 256, this.lastTimeS = 0, this.frames60timer = 0, this.frames60 = 0, this.frameCounter = 0, this.frameCounter60 = 0, this.blockTimeSegment = 0, this.framebuffer = t.createFramebuffer(), this.shWindParticleDraw = this.compileShader(e.shParticleDrawVS, e.shParticleDrawFS, [], "WindParticleDraw"), this.shWaveParticleDraw = this.compileShader(e.shParticleDrawVS, e.shParticleDrawFS, ["WAVES"], "WaveParticleDraw"), this.shScreen = this.compileShader(e.shScreenVS, e.shScreenFS, [], "Screen"), this.shCopy = this.compileShader(e.shScreenVS, e.shCopyFS, [], "Copy"), this.shParticleUpdate = this.compileShader(e.shScreenVS, e.shParticleUpdateFS, [], "ParticleUpdate"), this.vertexBufferRect = t.createBuffer(new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1])), this.initParticleDataStructures(this.stateResX, this.stateResY), this.windTexture = null
            },
            compileShader: function(t, e, i, a) {
                var r;
                try {
                    r = this.glo.createProgramObj(t, e, i, a)
                } catch (t) {
                    0, window.wError("GlParticles", "Unable to create programObj", t), ++this.errorCount, r = null
                }
                return r
            },
            checkSizesAndReinit: function() {
                var e = this.glo;
                if (e && e.gl && e.canvas) {
                    var i = e.get(),
                        a = e.getCanvas();
                    if (this.lastClientWidth !== a.width || this.lastClientHeight !== a.height) {
                        this.lastClientWidth = a.width, this.lastClientHeight = a.height;
                        var r = Math.min(i.getParameter(i.MAX_TEXTURE_SIZE), 2048),
                            s = this.ratioScale > 1.5 ? .8 : 1,
                            n = Math.min(t.getNextPowerOf2Size(s * this.lastClientWidth), r),
                            o = Math.min(t.getNextPowerOf2Size(s * this.lastClientHeight), r);
                        if (this.backTextureWidth !== n || this.backTextureHeight !== o) {
                            this.backTextureWidth = n, this.backTextureHeight = o;
                            var l = new Uint8Array(this.backTextureWidth * this.backTextureHeight * 4);
                            this.backTexture = e.createTexture2D(i.LINEAR, i.LINEAR, i.REPEAT, l, this.backTextureWidth, this.backTextureHeight)
                        }
                    }
                }
            },
            prepareAlphaLUT: function(t, e, i, a) {
                this.alphaLut = new Float32Array(this.totalTimeFrames);
                var r, s, n = Math.round(t * this.totalTimeFrames),
                    o = Math.round(i * this.totalTimeFrames);
                for (r = 0; r < this.totalTimeFrames; r++) s = 1, r < n ? s = Math.pow(1 * r / n, e) : r >= this.totalTimeFrames - o && (s = Math.pow(1 * (this.totalTimeFrames - r) / o, a)), this.alphaLut[r] = s
            },
            initParticleDataStructures: function(t, e) {
                var i, a, r, s, n, o = this.glo,
                    l = o.get();
                this.particlesCount = t * e, this.vertsPerParticle = 4, this.vertexStride = 4, this.stateBlock = 0, this.stateBlockDY = e / this.stateBlocksCount;
                var h = new Uint8Array(4 * this.particlesCount);
                for (i = 0; i < h.length; i++) h[i] = Math.floor(256 * Math.random());
                this.textureState0 = o.createTexture2D(l.NEAREST, l.NEAREST, l.REPEAT, h, t, e), this.textureState1 = o.createTexture2D(l.NEAREST, l.NEAREST, l.REPEAT, h, t, e);
                var u = t * this.stateBlockDY * this.vertsPerParticle * this.vertexStride,
                    c = new Uint8Array(u),
                    d = [0, 0, 255, 0, 255, 255, 0, 255];
                for (n = 0, i = 0; i < t; i++)
                    for (a = 0; a < this.stateBlockDY; a++)
                        for (r = 0; r < this.vertsPerParticle; r++) c[n++] = i, c[n++] = a, c[n++] = d[2 * r], c[n++] = d[2 * r + 1];
                this.vertexBuffer = o.createBuffer(c);
                var m = [0, 1, 2, 0, 2, 3];
                this.indsPerParticle = m.length, this.particlesPerBlock = t * this.stateBlockDY, this.indexCount = this.particlesPerBlock * this.indsPerParticle;
                var f = new Uint16Array(this.indexCount);
                for (a = 0, s = 0, i = 0; i < this.indexCount; i++) f[i] = s + m[a], ++a >= m.length && (a = 0, s += this.vertsPerParticle);
                this.indexBuffer = o.createIndexBuffer(f)
            },
            reinitStateBlock: function(t) {
                for (var e = this.glo, i = e.get(), a = this.stateBlockDY * t, r = this.stateResX * this.stateBlockDY * 4, s = new Uint8Array(r), n = 0; n < r; n++) s[n] = Math.floor(256 * Math.random());
                e.bindTexture2D(this.textureState0), i.texSubImage2D(i.TEXTURE_2D, 0, 0, a, this.stateResX, this.stateBlockDY, i.RGBA, i.UNSIGNED_BYTE, s), e.bindTexture2D(this.textureState1), i.texSubImage2D(i.TEXTURE_2D, 0, 0, a, this.stateResX, this.stateBlockDY, i.RGBA, i.UNSIGNED_BYTE, s)
            },
            setGlobalAlpha: function(t) {
                this.alpha = t
            },
            fadeOut: function() {
                var t = this.glo,
                    e = t.get(),
                    i = this.shScreen;
                e.useProgram(i.program), t.bindAttribute(this.vertexBufferRect, i.aPos, 2, e.FLOAT, 0, 8, 0), e.uniform4f(i.uVPars0, 1, 1, 0, 0), e.enable(e.BLEND);
                var a = this.fadeScale;
                e.blendColor(a, a, a, a), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ZERO, e.CONSTANT_ALPHA), e.drawArrays(e.TRIANGLE_FAN, 0, 4), e.disable(e.BLEND)
            },
            drawParticles: function() {
                var t = this.glo,
                    e = t.get(),
                    i = this.mapParams.partObj,
                    a = "waves" === this.mapParams.particlesIdent ? this.shWaveParticleDraw : this.shWindParticleDraw;
                e.useProgram(a.program), t.bindAttribute(this.vertexBuffer, a.aVecA, 4, e.UNSIGNED_BYTE, 0, this.vertexStride, 0), t.bindTexture2D(this.textureState0, 0, a.sState0), t.bindTexture2D(this.textureState1, 1, a.sState1);
                var r = this.transformParams.widthFactor + 1,
                    s = r / this.lastClientWidth,
                    n = r / this.lastClientHeight,
                    o = i.glParticleLengthEx / this.lastClientWidth,
                    l = i.glParticleLengthEx / this.lastClientHeight;
                e.uniform4f(a.uVPars1, 2 * s / 255, 2 * n / 255, -s, -n), e.uniform4f(a.uVPars2, 2 * o / 255, 2 * l / 255, -o, -l);
                var h = Math.max(1, .8 * this.transformParams.widthFactor);
                e.uniform4f(a.uVPars3, 0, 0, 2 * h / 255, -h), e.uniform4f(a.uPars1, h, 0, 0, 0), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer), e.enable(e.BLEND), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE_MINUS_DST_ALPHA, e.ONE);
                for (var u = Math.max(1, Math.min(Math.round(this.transformParams.relativeAmount * this.particlesPerBlock), this.particlesPerBlock)) * this.indsPerParticle, c = 1 / this.stateBlocksCount, d = this.timeFrame0, m = 0; m < this.stateBlocksCount; m++) {
                    e.uniform4f(a.uVPars0, 1 / this.stateResX, 1 / this.stateResY, 0, m * c);
                    var f = this.alphaLut[d];
                    e.uniform4f(a.uPars0, f, f, f, f), e.drawElements(e.TRIANGLES, u, e.UNSIGNED_SHORT, 0), (d -= this.blockTimeSegmentSize) < 0 && (d += this.totalTimeFrames)
                }
                e.disable(e.BLEND)
            },
            copyToCanvas: function() {
                var t = this.glo,
                    e = t.get();
                t.bindFramebuffer(null), e.viewport(0, 0, t.getCanvas().width, t.getCanvas().height), e.enable(e.BLEND), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ONE);
                var i, a = this.shCopy;
                if (e.useProgram(a.program), t.bindAttribute(this.vertexBufferRect, a.aPos, 2, e.FLOAT, 0, 8, 0), t.bindTexture2D(this.backTexture, 0, a.sTex0), e.uniform4f(a.uVPars0, 1, 1, 0, 0), e.uniform4f(a.uVPars1, 1, 1, 0, 0), this.mapParams.zoom >= 12) i = [.5, 0, .4, this.transformParams.mulAZoomed];
                else {
                    var r = .4 * this.transformParams.mulRGB;
                    i = [r, r, r, .4 * this.transformParams.mulA]
                }
                for (var s = 0; s < 4; s++) i[s] *= this.alpha;
                e.uniform4fv(a.uPars0, i);
                e.uniform4fv(a.uPars1, [-.1, -.1, -.1, -.1]), e.drawArrays(e.TRIANGLE_FAN, 0, 4), e.disable(e.BLEND)
            },
            updateParticles: function(t) {
                var e = this.glo,
                    i = e.get();
                e.bindFramebuffer(this.framebuffer, this.textureState1), i.viewport(0, 0, this.stateResX, this.stateResY);
                var a = this.shParticleUpdate;
                i.useProgram(a.program), e.bindAttribute(this.vertexBufferRect, a.aPos, 2, i.FLOAT, 0, 8, 0), e.bindTexture2D(this.textureState0, 0, a.sState), e.bindTexture2D(this.windTexture, 3, a.sWind);
                var r = Math.min(Math.floor(256 * this.transformParams.relativeAmount + 1), 256) / 256;
                i.uniform4f(a.uVPars0, r, 1, r - 1, 0), i.uniform4f(a.uVPars1, r, 1, 0, 0), i.uniform4f(a.uPars0, this.windTextureMulX, -this.windTextureMulY, this.windTextureAddX, this.windTextureMulY + this.windTextureAddY);
                var s = this.frameTime * this.transformParams.timeScale,
                    n = s / this.lastClientWidth,
                    o = s / this.lastClientHeight;
                i.uniform4f(a.uPars1, 2 * n, 2 * o, -n, -o), i.drawArrays(i.TRIANGLE_FAN, 0, 4), e.bindFramebuffer(null), t >= 0 && this.reinitStateBlock(t);
                var l = this.textureState0;
                this.textureState0 = this.textureState1, this.textureState1 = l
            },
            updateFrame: function() {
                if (this.frameCounter60++, this.frameCounter60 % 2 == 0) {
                    var t = this.glo,
                        e = t.get(),
                        i = .001 * Date.now();
                    if (this.frameTime = Math.min(i - this.lastTimeS, .1), this.lastTimeS = i, this.frames60timer += this.frameTime, this.frames60 = Math.max(1, Math.round(60 * this.frames60timer)), this.frames60timer -= .0166667 * this.frames60, this.windTexture && this.transformParams) {
                        var a = -1;
                        this.timeFrame0 = this.stateBlock * this.blockTimeSegmentSize, this.blockTimeSegment += this.frames60, this.blockTimeSegment >= this.blockTimeSegmentSize && (this.blockTimeSegment -= this.blockTimeSegmentSize, a = this.stateBlock, ++this.stateBlock >= this.stateBlocksCount && (this.stateBlock = 0)), this.timeFrame0 = (this.stateBlock - 1) * this.blockTimeSegmentSize, this.timeFrame0 += this.blockTimeSegment, this.timeFrame0 < 0 && (this.timeFrame0 += this.totalTimeFrames), this.needUpdateParams && (this.updateParamsFromConfig(), this.needUpdateParams = !1), this.relParticleShiftX = this.shiftX / this.lastClientWidth, this.relParticleShiftY = this.shiftY / this.lastClientHeight, t.bindFramebuffer(this.framebuffer, this.backTexture), e.viewport(0, 0, this.backTextureWidth, this.backTextureHeight), this.needClear && (e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT), this.needClear = !1, this.animationStopped && this.copyToCanvas()), this.animationStopped || (this.drawParticles(), this.fadeOut(), this.copyToCanvas(), this.updateParticles(a), this.alpha < 1 && (this.alpha += 1.8 * this.frameTime, this.alpha > 1 && (this.alpha = 1)), this.frameCounter++, this.showCanvas(!0))
                    }
                }
            },
            setNewWindData: function(t) {
                this.reset(), this.transformParams = t.transformParams, this.mapParams = t.mapParams;
                var e = this.glo,
                    i = e.get(),
                    a = i.LUMINANCE_ALPHA;
                if (this.windTextureResX = t.sizeX, this.windTextureResY = t.sizeY, this.windTexture ? (e.bindTexture2D(this.windTexture), i.texImage2D(i.TEXTURE_2D, 0, a, this.windTextureResX, this.windTextureResY, 0, a, i.UNSIGNED_BYTE, null)) : this.windTexture = e.createTexture2D(i.LINEAR, i.LINEAR, i.CLAMP_TO_EDGE, null, this.windTextureResX, this.windTextureResY, a), t.textureTiles) {
                    var r = t.textureTiles,
                        s = t.textureTilesPos,
                        n = r.length;
                    e.bindTexture2D(this.windTexture);
                    for (var o = 0; o < n; o++) {
                        var l = r[o],
                            h = s[o];
                        i.texSubImage2D(i.TEXTURE_2D, 0, h.x, h.y, l.tileSize, l.tileSize, a, i.UNSIGNED_BYTE, l.data)
                    }
                }
                this.newWindData = null;
                var u = this.transformParams;
                this.windTextureMulX = 1 * u.relativeDX * u.width / (u.tilesDX * u.trans), this.windTextureMulY = 1 * u.relativeDY * u.height / (u.tilesDY * u.trans), this.windTextureAddX = u.offsetX / (this.windTextureResX * u.trans) + .48 / this.windTextureResX, this.windTextureAddY = u.offsetY / (this.windTextureResY * u.trans) + .48 / this.windTextureResY, this.needUpdateParams = !0
            },
            updateParamsFromConfig: function() {
                var t = this.transformParams,
                    e = this.mapParams,
                    a = i.get("particles");
                if (t && e) {
                    var r, s, n, o = e.partObj;
                    e.particlesIdent !== this.particlesIdentLast && this.reinitParticleType(e.particlesIdent), o.configurable ? (r = a.velocity || 1, s = a.opacity || 1, n = a.blending || 1) : (r = o.glVelocity, s = o.glOpacity, n = o.glBlending);
                    var l = o.getAmount.call(o, e),
                        h = o.getAmountMultiplier.call(o);
                    t.relativeAmount = l / 65536, h < 1 && (t.relativeAmount *= 1 + 7 * (1 - h)), t.relativeAmount *= o.glCountMul, t.widthFactor = Math.max(1, o.getLineWidth.call(o, e) * o.glParticleWidth * this.ratioScale), t.timeScale = r * o.glSpeedPx * t.zoomWindFactor * this.ratioScale, t.mulRGB = .7 * s + .4, t.mulA = s, t.mulAZoomed = .44 * s + .3, t.mulA > 1 && (t.mulA = 2 - t.mulA), t.mulA += .1;
                    var u = n - .92;
                    this.fadeScale = Math.min(.9 + .5 * u, .98)
                }
            },
            onInit: function() {
                this.errorCount = 0
            },
            onCreateCanvas: function() {
                this.bcastRedrawLayersId = a.on("redrawLayers", function() {
                    this.needUpdateParams = !0
                }.bind(this));
                try {
                    this.createGlStuff(this.getCanvas()), this.checkSizesAndReinit()
                } catch (t) {
                    0, window.wError("GlParticles", "unspecified error in createGlStuff", t), ++this.errorCount
                }
                return this.isOk()
            },
            onCanvasFailed: function() {
                this.glo.release(), r.emit("glParticlesFailed")
            },
            onRemoveCanvas: function() {
                this.glo.release(), this.resetGlStuff(), -1 !== this.bcastRedrawLayersId && (a.off(this.bcastRedrawLayersId), this.bcastRedrawLayersId = -1)
            },
            onResizeCanvas: function(t, e) {
                var i = Math.min(window.devicePixelRatio || 1, 2),
                    a = this.getCanvas();
                (t > 1200 || e > 1200) && (i = Math.min(i, 1.5)), this.ratioScale = i, a.width = t * i, a.height = e * i, a.style.width = t + "px", a.style.height = e + "px", this.checkSizesAndReinit()
            },
            onReset: function() {
                this.alpha = 0, this.needClear = !0, this.showCanvas(!1)
            }
        })
    }),
    /*! */
    W.define("glAnimation", ["store"], function(t) {
        var e, i = null,
            a = !1,
            r = "off" === t.get("particlesAnim"),
            s = !1;

        function n() {
            e._canvas.style.opacity = 0, e.animationStopped = !0, e.needClear = !0, e.updateFrame()
        }

        function o() {
            e._canvas.style.opacity = 1, e.animationStopped = !1, e.needClear = !0
        }

        function l() {
            cancelAnimationFrame(i)
        }

        function h() {
            i = requestAnimationFrame(h), e.updateFrame()
        }

        function u() {
            cancelAnimationFrame(i), r || (o(), s || h())
        }
        return {
            init: function(t) {
                e = t
            },
            suspend: function() {
                a = !0, l(), n()
            },
            enable: function() {
                a = !1, u()
            },
            run: u,
            stop: l,
            pause: function() {
                s = !0, l()
            },
            resume: function() {
                s = !1, u()
            },
            toggle: function(t) {
                "off" === t ? (l(), n(), r = !0) : r && (o(), r = !1, a || u())
            }
        }
    }),
    /*! */
    W.define("glShaders", [], function() {
        return {
            shScreenVS: "\n\tattribute vec2 aPos;\n\tuniform vec4 uVPars0;\n\tuniform vec4 uVPars1;\n\tvarying vec4 vTc0;\n\n\tvoid main(void) {\n\t\tgl_Position = vec4( aPos * uVPars0.xy + uVPars0.zw, 0.0, 1.0 );\n\t\tvec2 tc0 = aPos.xy * 0.5 + 0.5;\n\t\tvTc0 = vec4( tc0 * uVPars1.xy + uVPars1.zw, aPos.xy );\n\t}\n",
            shScreenFS: "\n\tprecision mediump float;\n\tuniform vec4 uPars0;\n\tvarying vec4 vTc0;\n\n\tvoid main(void) {\n\t\tgl_FragColor = uPars0;\n\t}\n",
            shCopyFS: "\n\tprecision mediump float;\n\n\tuniform vec4 uPars0; // mul color\n\tuniform vec4 uPars1; // add color\n\n\tuniform sampler2D sTex0;\n\n\tvarying vec4 vTc0;\n\n\tvoid main(void) {\n\t\tgl_FragColor = texture2D( sTex0, vTc0.xy ) * uPars0 + uPars1;\n\t}\n",
            shParticleDrawVS: "\n\tprecision mediump float;\n\n\tattribute vec4 aVecA; // xy ..position in state texture <0,255>; zw .. vertex position in particle flags\n\n\tuniform sampler2D sState0; // actual particle position\n\tuniform sampler2D sState1; // last position\n\n\tuniform vec4 uVPars0; // xy .. tc mul, zw ..tc add\n\tuniform vec4 uVPars1;\n\tuniform vec4 uVPars2;\n\tuniform vec4 uVPars3; // xy .. relative shift, zw..antialiasing MAD\n\n\tvarying vec4 vTc0;\n\n\tvoid main() {\n\t\tvec2 tc = aVecA.xy * uVPars0.xy + uVPars0.zw;\n\t\tvec4 tex0 = texture2D( sState0, tc );\n\t\tvec4 tex1 = texture2D( sState1, tc );\n\t\tvec2 posA = fract( tex0.ba + tex0.rg / 255.5 + uVPars3.xy ) * 2.0 - 1.0; // particle position in <-1.0,1.0> space\n\t\tvec2 posB = fract( tex1.ba + tex1.rg / 255.5 + uVPars3.xy ) * 2.0 - 1.0; // last particle position <-1.0,1.0> space\n\n\t\tvec2 dirF = posA - posB;\n\t\tvec2 dirFN = normalize( dirF ); // normalized forward direction ( from B to A )\n\t\tfloat d = length( dirF ); // d can be used for alpha from speed\n\t\tvec2 dirRN = vec2( dirFN.y, -dirFN.x ); // perpendicular direction (right from dirFN)\n\n\t\tvec2 pos = mix( posB, posA, aVecA.w * 0.003921569 ); // select posA or posB\n\t\tpos += dirRN * ( aVecA.zz * uVPars1.xy + uVPars1.zw ); // add width\n#ifdef WAVES\n\t\tpos += dirFN * ( aVecA.ww * uVPars2.xy + uVPars2.zw ); // add extra length\n\t\tif( d > 0.5 || d < 0.00005 ) {\n\t\t\tpos.x += 10.0; // bad particle! move away!\n\t\t}\n#else\n\t\tif( d > 0.5 ) {\n\t\t\tpos.x += 10.0;\n\t\t}\n#endif\n\t\tgl_Position = vec4( pos.xy, 0, 1 );\n\t\tvTc0.x = uVPars3.z * aVecA.z + uVPars3.w;\n\t}\n",
            shParticleDrawFS: "\n\tprecision mediump float;\n\tuniform vec4 uPars0;\n\tuniform vec4 uPars1;\n\n\tvarying vec4 vTc0;\n\n\tvoid main(void) {\n\t\tfloat aa = clamp( uPars1.x - abs( vTc0.r ), 0.0, 1.0 );\n\t\tgl_FragColor = uPars0 * vec4( aa );\n\t}\n",
            shParticleUpdateFS: "\n\tprecision mediump float; // highp\n\n\tuniform vec4 uPars0; // wind texture coords MAD\n\tuniform vec4 uPars1; // particle velocity params (computed per frame)\n\n\tuniform sampler2D sState; // last particle position\n\tuniform sampler2D sWind; // composited wind direction texture\n\n\tvarying vec4 vTc0;\n\n\tvoid main(void) {\n\t\tvec4 tex0 = texture2D( sState, vTc0.xy );\n\t\tvec2 pos = tex0.ba + tex0.rg / 255.5; // decode position from last state texture\n\t\tvec2 tc = fract( pos ) * uPars0.xy + uPars0.zw; // texture coordinates to wind vectors texture // pos + uPars2.xy\n\t\tvec2 dpos = texture2D( sWind, tc ).ra * uPars1.xy + uPars1.zw; // delta position from wind\n\t\tpos = fract( pos + dpos ); // new position and wrap in interval <0.0, 1.0)\n\t\t// output new position\n\t\tgl_FragColor.rg = fract( pos * 255.0 + 0.25 / 255.0 ); // encode lo bits\n\t\tgl_FragColor.ba = pos - gl_FragColor.rg / 255.0; // encode hi bits\n\t}\n"
        }
    }),
    /*! */
    W.define("glVectors", ["render", "glAnimation", "particles", "utils", "GlObj", "lruCache", "DataTiler"], function(t, e, i, a, r, s, n) {
        return n.instance({
            glCanvas: null,
            syncCounter: 0,
            cancelRqstd: !1,
            latestParams: null,
            enabled: !0,
            tileSize: 256,
            tileCache: new s(16),
            cancelTasks: function() {
                this.syncCounter++
            },
            tilesReady: function(t, e, a) {
                Object.assign(e, a), e.partObj = i[a.particlesIdent];
                var r = {
                    width: this.width,
                    height: this.height,
                    offsetX: this.offsetX,
                    offsetY: this.offsetY,
                    trans: this.trans
                };
                this.processTiles(t, e, r)
            },
            redrawVectors: function() {
                this.mapMoved = !0, this.latestParams && this.getTiles(this.latestParams)
            },
            init: function(t, e) {
                this.glCanvas = t, this.latestParams = a.clone(e), this.redrawVectors()
            },
            paramsChanged: function(e) {
                this.latestParams && this.latestParams.fullPath === e.fullPath && this.latestParams.overlay === e.overlay ? t.emit("rendered", "particles") : (this.latestParams = a.clone(e), this.getTiles(this.latestParams))
            },
            getTexture: function(t, e) {
                var i = e.partObj,
                    a = this.tileSize * this.tileSize * 2,
                    r = new Uint8ClampedArray(a),
                    s = t.data,
                    n = i.level2reduce[e.level] / i.glMaxSpeedParam,
                    o = n * i.glMinSpeedParam,
                    l = o * o,
                    h = e.JPGtransparency,
                    u = 8224,
                    c = 0,
                    d = .5 * i.glSpeedCurvePowParam;
                if (h)
                    for (var m = 0; m < 256; m++) {
                        for (var f = 0; f < 256; f++) {
                            if (s[u + 2] > 128) r[c++] = 128, r[c++] = 128;
                            else {
                                var p = t.decodeR(s[u]) * n,
                                    v = t.decodeG(s[u + 1]) * n,
                                    P = p * p + v * v;
                                if (P > l) {
                                    var g = 128 * Math.pow(P, d) / Math.sqrt(P);
                                    p *= g, v *= g
                                } else if (P > 1e-6) {
                                    var x = 128 * o / Math.sqrt(P);
                                    p *= x, v *= x
                                } else p = 0, v = 0;
                                r[c++] = 128 + Math.round(p), r[c++] = 128 + Math.round(v)
                            }
                            u += 4
                        }
                        u += 4
                    } else
                        for (var S = 0; S < 256; S++) {
                            for (var T = 0; T < 256; T++) {
                                if (s[u + 3] < 128) r[c++] = 128, r[c++] = 128;
                                else {
                                    var w = t.decodeR(s[u]) * n,
                                        b = t.decodeG(s[u + 1]) * n,
                                        A = w * w + b * b;
                                    if (A > l) {
                                        var C = 128 * Math.pow(A, d) / Math.sqrt(A);
                                        w *= C, b *= C
                                    } else if (A > 1e-6) {
                                        var D = 128 * o / Math.sqrt(A);
                                        w *= D, b *= D
                                    } else w = 0, b = 0;
                                    r[c++] = 128 + Math.round(w), r[c++] = 128 + Math.round(b)
                                }
                                u += 4
                            }
                            u += 4
                        }
                return {
                    url: t.url,
                    tileSize: this.tileSize,
                    data: new Uint8Array(r)
                }
            },
            processTiles: function(i, a, s) {
                var n = i.length,
                    o = n ? i[0].length : 0;
                if (0 !== n && 0 !== n) {
                    for (var l = a.partObj.zoom2speed[a.zoom], h = [], u = [], c = 0; c < n; c++)
                        for (var d = 0; d < o; d++) {
                            var m = i[c][d];
                            if (m) {
                                var f = this.tileCache.get(m.url, null);
                                f || (f = this.getTexture(m, a), this.tileCache.put(m.url, f)), h.push(f), u.push({
                                    x: d * this.tileSize,
                                    y: c * this.tileSize
                                })
                            }
                        }
                    if (1 === h.length) {
                        var p = h[0],
                            v = u[0];
                        h.push({
                            url: p.url,
                            tileSize: p.tileSize,
                            data: p.data
                        }), u.push({
                            x: v.x + p.tileSize,
                            y: v.y
                        }), o++
                    }
                    var P = r.getNextPowerOf2Size(o) * this.tileSize,
                        g = r.getNextPowerOf2Size(n) * this.tileSize;
                    s.tilesDX = o * this.tileSize, s.tilesDY = n * this.tileSize, s.relativeDX = 1 * o * this.tileSize / P, s.relativeDY = 1 * n * this.tileSize / g, s.zoomWindFactor = l, this.glCanvas && (this.glCanvas.setNewWindData({
                        sizeX: P,
                        sizeY: g,
                        textureTiles: h,
                        textureTilesPos: u,
                        transformParams: s,
                        mapParams: a
                    }), e.run()), t.emit("rendered", "particles")
                }
            }
        })
    }),
    /*! */
    W.define("gl-particles", ["glVectors", "glAnimation", "broadcast", "storage", "rootScope", "map", "store", "GlParticlesClass"], function(t, e, i, a, r, s, n, o) {
        var l = new o({
            disableAutoReset: !0
        });
        e.init(l);
        var h = function(e) {
            return e ? t.redrawVectors.call(t) : t.cancelTasks.call(t)
        };
        return {
            open: function(o) {
                return l.addTo(s), l.failed ? (a.put("webGLtest3", {
                    status: "initFailed",
                    ua: window.navigator.userAgent
                }), i.emit("log", "particles/status/initFailed"), !1) : (r.glParticlesOn = !0, l.getCanvas().classList.add("particles-layer"), s.on("moveend", t.redrawVectors, t), s.on("movestart", t.cancelTasks, t), s.on("zoomstart", e.pause), s.on("zoomend", e.resume), n.on("particlesAnim", e.toggle), n.on("visibility", h), e.enable(), t.init(l, o), !0)
            },
            close: function() {
                e.suspend(), n.off("particlesAnim", e.toggle), n.off("visibility", h), s.off("moveend", t.redrawVectors, t), s.off("movestart", t.cancelTasks, t), s.off("zoomstart", e.pause), s.off("zoomend", e.resume), s.removeLayer(l)
            },
            redraw: t.redrawVectors.bind(t),
            paramsChanged: t.paramsChanged.bind(t)
        }
    });
