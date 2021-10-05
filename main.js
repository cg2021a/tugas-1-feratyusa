function main(){
    /**
     * @type {HTMLCanvasElement} canvas
     */
    const canvas = document.getElementById('myCanvas');

    /**
     * @type {WebGLRenderingContext} gl
     */
    const gl = canvas.getContext('webgl');
    
    // Right Side
    const right_things = {
        // Color
        color_black: [0.0, 0.0, 0.0],
        color_black_light: [0.5, 0.5, 0.5],
        color_inside: [0.79, 0.95, 0.36],
        // Top Point
        top_a: [0.1, 0.32],
        top_b: [0.15, 0.35],
        top_c: [0.8, 0.35],
        top_d: [0.85, 0.32],
        top_e: [0.85, 0.05],
        top_f: [0.8, 0.02],
        top_g: [0.15, 0.02],
        top_h: [0.1, 0.05],
        // Center Point
        center_a: [0.3, 0.01],
        center_b: [0.3, -0.01],
        center_c: [0.65, -0.01],
        center_d: [0.65, 0.01],
        // Bottom Point
        bot_a: [0.07, -0.32],
        bot_b: [0.12, -0.35],
        bot_c: [0.83, -0.35],
        bot_d: [0.88, -0.32],
        bot_e: [0.85, -0.05],
        bot_f: [0.8, -0.02],
        bot_g: [0.15, -0.02],
        bot_h: [0.1, -0.05],
        // Alas Point
        al_a:[0.13, -0.37],
        al_b: [0.8, -0.37],
        // Inside
        ins_a: [0.12, -0.1],
        ins_b: [0.12, -0.30],
        ins_c: [0.83, -0.30],
        ins_d: [0.83, -0.1],
    };

    const vertices = [
        // Right Things
        // 1. Top Shape
        ...right_things.top_a, ...right_things.color_black_light, // Top Side: 6
        ...right_things.top_b, ...right_things.color_black_light,
        ...right_things.top_c, ...right_things.color_black_light,
        ...right_things.top_a, ...right_things.color_black_light, 
        ...right_things.top_d, ...right_things.color_black_light,
        ...right_things.top_c, ...right_things.color_black_light,

        ...right_things.top_c, ...right_things.color_black_light, // Right Side: 6
        ...right_things.top_d, ...right_things.color_black_light,
        ...right_things.top_e, ...right_things.color_black_light,
        ...right_things.top_c, ...right_things.color_black_light,
        ...right_things.top_f, ...right_things.color_black_light,
        ...right_things.top_e, ...right_things.color_black_light,

        ...right_things.top_e, ...right_things.color_black_light, // Bottom Side: 6
        ...right_things.top_f, ...right_things.color_black_light,
        ...right_things.top_g, ...right_things.color_black_light,
        ...right_things.top_e, ...right_things.color_black_light,
        ...right_things.top_h, ...right_things.color_black_light,
        ...right_things.top_g, ...right_things.color_black_light,

        ...right_things.top_g, ...right_things.color_black_light, // Left Side: 6
        ...right_things.top_h, ...right_things.color_black_light,
        ...right_things.top_a, ...right_things.color_black_light,
        ...right_things.top_g, ...right_things.color_black_light,
        ...right_things.top_b, ...right_things.color_black_light,
        ...right_things.top_a, ...right_things.color_black_light,

        ...right_things.top_a, ...right_things.color_black_light, // Center Part: 6
        ...right_things.top_d, ...right_things.color_black_light,
        ...right_things.top_e, ...right_things.color_black_light,
        ...right_things.top_a, ...right_things.color_black_light,
        ...right_things.top_e, ...right_things.color_black_light,
        ...right_things.top_h, ...right_things.color_black_light,

        // 2. Center Shape
        ...right_things.top_g, ...right_things.color_black_light,
        ...right_things.center_a, ...right_things.color_black_light,
        ...right_things.center_d, ...right_things.color_black_light,

        ...right_things.top_g, ...right_things.color_black_light,
        ...right_things.top_f, ...right_things.color_black_light,
        ...right_things.center_d, ...right_things.color_black_light,

        ...right_things.center_a, ...right_things.color_black,
        ...right_things.center_b, ...right_things.color_black,
        ...right_things.center_c, ...right_things.color_black,

        ...right_things.center_a, ...right_things.color_black,
        ...right_things.center_d, ...right_things.color_black,
        ...right_things.center_c, ...right_things.color_black,

        ...right_things.bot_g, ...right_things.color_black_light,
        ...right_things.center_b, ...right_things.color_black_light,
        ...right_things.center_c, ...right_things.color_black_light,

        ...right_things.bot_g, ...right_things.color_black_light,
        ...right_things.bot_f, ...right_things.color_black_light,
        ...right_things.center_c, ...right_things.color_black_light,

        // 3. Bottom Shape
        ...right_things.bot_a, ...right_things.color_black_light, // bot Side: 6
        ...right_things.bot_b, ...right_things.color_black_light,
        ...right_things.bot_c, ...right_things.color_black_light,
        ...right_things.bot_a, ...right_things.color_black_light, 
        ...right_things.bot_d, ...right_things.color_black_light,
        ...right_things.bot_c, ...right_things.color_black_light,

        ...right_things.bot_c, ...right_things.color_black_light, // Right Side: 6
        ...right_things.bot_d, ...right_things.color_black_light,
        ...right_things.bot_e, ...right_things.color_black_light,
        ...right_things.bot_c, ...right_things.color_black_light,
        ...right_things.bot_f, ...right_things.color_black_light,
        ...right_things.bot_e, ...right_things.color_black_light,

        ...right_things.bot_e, ...right_things.color_black_light, // Bottom Side: 6
        ...right_things.bot_f, ...right_things.color_black_light,
        ...right_things.bot_g, ...right_things.color_black_light,
        ...right_things.bot_e, ...right_things.color_black_light,
        ...right_things.bot_h, ...right_things.color_black_light,
        ...right_things.bot_g, ...right_things.color_black_light,

        ...right_things.bot_g, ...right_things.color_black_light, // Left Side: 6
        ...right_things.bot_h, ...right_things.color_black_light,
        ...right_things.bot_a, ...right_things.color_black_light,
        ...right_things.bot_g, ...right_things.color_black_light,
        ...right_things.bot_b, ...right_things.color_black_light,
        ...right_things.bot_a, ...right_things.color_black_light,

        ...right_things.bot_a, ...right_things.color_black_light, // Center Part: 6
        ...right_things.bot_d, ...right_things.color_black_light,
        ...right_things.bot_e, ...right_things.color_black_light,
        ...right_things.bot_a, ...right_things.color_black_light,
        ...right_things.bot_h, ...right_things.color_black_light,
        ...right_things.bot_e, ...right_things.color_black_light,

        // 4. Inside
        ...right_things.ins_a, ...right_things.color_inside,
        ...right_things.ins_b, ...right_things.color_inside,
        ...right_things.ins_c, ...right_things.color_inside,
        ...right_things.ins_a, ...right_things.color_inside,
        ...right_things.ins_d, ...right_things.color_inside,
        ...right_things.ins_c, ...right_things.color_inside,

        // 5. Alas
        ...right_things.bot_b, ...right_things.color_black,
        ...right_things.al_a, ...right_things.color_black,
        ...right_things.bot_a, ...right_things.color_black,
        
        ...right_things.bot_c, ...right_things.color_black,
        ...right_things.al_b, ...right_things.color_black,
        ...right_things.bot_d, ...right_things.color_black,

        ...right_things.bot_b, ...right_things.color_black,
        ...right_things.al_a, ...right_things.color_black,
        ...right_things.al_b, ...right_things.color_black,

        ...right_things.bot_b, ...right_things.color_black,
        ...right_things.bot_c, ...right_things.color_black,
        ...right_things.al_b, ...right_things.color_black,
    ];

    // Create a linked-list for storing the vertices data
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform vec2 uChange;
        void main() {
            gl_PointSize = 10.0;
            gl_Position = vec4(aPosition, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    // Create .c in GPU
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // Compile .c into .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // Prepare a .exe shell (shader program)
    var shaderProgram = gl.createProgram();

    // Put the two .o files into the shell
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // Link the two .o files, so together they can be a runnable program/context.
    gl.linkProgram(shaderProgram);

    // Start using the context (analogy: start using the paints and the brushes)
    gl.useProgram(shaderProgram);

    // Teach the computer how to collect
    //  the positional values from ARRAY_BUFFER
    //  to each vertex being processed
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition, 
        2, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor, 
        3, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    gl.clearColor(0.9, 0.9, 0.9, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 96);

    // var freeze = false;
    // // Apply some interaction using mouse
    // function onMouseClick(event) {
    //     freeze = !freeze;
    // }
    // document.addEventListener("click", onMouseClick, false);

    // var speed = [3/600, 1/600];
    // // Create a uniform to animate the vertices
    // var uChange = gl.getUniformLocation(shaderProgram, "uChange");
    // var change = [0, 0];

    // function render() {
    //     if (!freeze) {
    //         change[0] = change[0] + speed[0];
    //         change[1] = change[1] + speed[1];
    //         gl.uniform2fv(uChange, change);
    //         gl.clearColor(0.1, 0.1, 0.1, 1.0);
    //         gl.clear(gl.COLOR_BUFFER_BIT);
    //         gl.drawArrays(gl.TRIANGLES, 0, 36);
    //     }
    //     requestAnimationFrame(render);
    // }
    // requestAnimationFrame(render);
}