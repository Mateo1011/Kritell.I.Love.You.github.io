//VALIDACIÓN DE REGISTRAR

var attempt = 5; // Variable contador de intentos.

function validate2() {

    var primer_nombre = document.getElementById("primer_nombre").value;
    var segundo_nombre = document.getElementById("segundo_nombre").value;
    var primer_apellido = document.getElementById("primer_apellido").value;
    var segundo_apellido = document.getElementById("segundo_apellido").value;
    var tipo_identificacion = document.getElementById("tipo_identificacion").value;
    var numero_identificacion = document.getElementById("numero_identificacion").value;
    var direccion = document.getElementById("direccion").value;
    var telefono = document.getElementById("telefono").value;
    var correo = document.getElementById("correo").value;
    var crear_usuario = document.getElementById("crear_usuario").value;
    var crear_contraseña = document.getElementById("crear_contraseña").value;
    var confirmar_contraseña = document.getElementById("confirmar_contraseña").value;



    if (primer_nombre == "")
        alert("Por favor, ingresa el primer nombre")

    if (segundo_nombre == "")
        alert("Por favor, ingresa el segundo nombre")

    if (primer_apellido == "")
        alert("Por favor, ingresa el primer apellido")

    if (segundo_apellido == "")
        alert("Por favor, ingresa el segundo apellido")

    if (tipo_identificacion == "")
        alert("Por favor, ingresa el tipo de identificacion")

    if (numero_identificacion == "")
        alert("Por favor, ingresa el numero de identificacion")

    if (direccion == "")
        alert("Por favor, ingresa la dirección")

    if (telefono == "")
        alert("Por favor, ingresa el telefono")

    if (correo == "")
        alert("Por favor, ingresa el correo electronico")

    if (crear_usuario == "")
        alert("Por favor,  crea un usuario")

    if (crear_contraseña == "")
        alert("Por favor, crea una contraseña")

    if (confirmar_contraseña == "")
        alert("Por favor, confirma la contraseña")



    if (primer_nombre == "Carlos" && segundo_nombre == "Mario" && primer_apellido  == "Franco" && segundo_apellido == "Meneses" && tipo_identificacion == "Cedula" && numero_identificacion == "1015992141" && direccion == "Cll 22" && telefono == "3134679310" && correo == "carlosfranco@gmail.com" && crear_usuario == "CarlosFranco" && crear_contraseña == "gorillaz00" && confirmar_contraseña == "gorillaz00") {
        alert("REGISTRO EXITOSO");
        window.location = "login_inventario.html"; // Redirecting to other page.
        return true;
    }
    else {
        attempt--;// decrementa el contador.
        alert("Lo siento le quedan " + attempt + " intentos;");
        // deshabilita cuando cumpla tres intentos es decir llegue a cero opciones
        if (attempt == 0) {
            document.getElementById("primer_nombre").disabled = true;
            document.getElementById("segundo_nombre").disabled = true;
            document.getElementById("primer_apellido").disabled = true;
            document.getElementById("segundo_apellido").disabled = true;
            document.getElementById("tipo_identificacion").disabled = true;
            document.getElementById("numero_identificacion").disabled = true;
            document.getElementById("direccion").disabled = true;
            document.getElementById("telefono").disabled = true;
            document.getElementById("correo").disabled = true;
            document.getElementById("crear_usuario").disabled = true;
            document.getElementById("crear_contraseña").disabled = true;
            document.getElementById("confirmar_contraseña").disabled = true;
            document.getElementById("register1").disabled = true;
            return false;
        }
    }
}


function validar() {

    var nombre = document.getElementById("nombre").value;
    var codigo = document.getElementById("codigo").value;



    if (nombre == "")
        alert("Por favor, ingresa un nombre")

    if (codigo == "")
        alert("Por favor, ingresa el codigo")


    if (nombre == null || valor.length == 0 || /^\s+$/.test(valor)) {
        return false;
    }
}

//VALIDACIÓN DE INICIO SESIÓN

var attempt =5; // Variable contador de intentos.

function validate(){

var usuario = document.getElementById("usuario").value;
var contraseña = document.getElementById("contraseña").value;



if(usuario=="")
    alert("Por favor, ingresa el Usuario")
    
if(contraseña=="")
    alert("Por favor, ingresa la contraseña")


if ( usuario == "3209492752" && contraseña == "Kristell03" )
{
alert ("INGRESO EXITOSO");
window.location = "inicio.html"; // Redirecting to other page.
return true;
}
else{
attempt --;// decrementa el contador.
alert("Lo siento le quedan "+attempt+" intentos;");
// deshabilita cuando cumpla tres intentos es decir llegue a cero opciones
if( attempt == 0){
document.getElementById("usuario").disabled = true;
document.getElementById("contraseña").disabled = true;
document.getElementById("submit").disabled = true;
return false;
}
}
}


function validar(){

    var nombre = document.getElementById("nombre").value;
    var codigo = document.getElementById("codigo").value;
    
    
    
    if(nombre=="")
        alert("Por favor, ingresa un nombre")
        
        if(codigo=="")
        alert("Por favor, ingresa el sodigo")
    
    
    if( nombre == null || valor.length == 0 || /^\s+$/.test(valor) ) {
      return false;
    }
}



/************* */
var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize the GL context
var gl = canvas.getContext('webgl');
if(!gl){
  console.error("Unable to initialize WebGL.");
}

//Time
var time = 0.0;

//************** Shader sources **************

var vertexSource = `
attribute vec2 position;
void main() {
	gl_Position = vec4(position, 0.0, 1.0);
}
`;

var fragmentSource = `
precision highp float;

uniform float width;
uniform float height;
vec2 resolution = vec2(width, height);

uniform float time;

#define POINT_COUNT 8

vec2 points[POINT_COUNT];
const float speed = -0.5;
const float len = 0.25;
float intensity = 1.3;
float radius = 0.008;

//https://www.shadertoy.com/view/MlKcDD
//Signed distance to a quadratic bezier
float sdBezier(vec2 pos, vec2 A, vec2 B, vec2 C){    
	vec2 a = B - A;
	vec2 b = A - 2.0*B + C;
	vec2 c = a * 2.0;
	vec2 d = A - pos;

	float kk = 1.0 / dot(b,b);
	float kx = kk * dot(a,b);
	float ky = kk * (2.0*dot(a,a)+dot(d,b)) / 3.0;
	float kz = kk * dot(d,a);      

	float res = 0.0;

	float p = ky - kx*kx;
	float p3 = p*p*p;
	float q = kx*(2.0*kx*kx - 3.0*ky) + kz;
	float h = q*q + 4.0*p3;

	if(h >= 0.0){ 
		h = sqrt(h);
		vec2 x = (vec2(h, -h) - q) / 2.0;
		vec2 uv = sign(x)*pow(abs(x), vec2(1.0/3.0));
		float t = uv.x + uv.y - kx;
		t = clamp( t, 0.0, 1.0 );

		// 1 root
		vec2 qos = d + (c + b*t)*t;
		res = length(qos);
	}else{
		float z = sqrt(-p);
		float v = acos( q/(p*z*2.0) ) / 3.0;
		float m = cos(v);
		float n = sin(v)*1.732050808;
		vec3 t = vec3(m + m, -n - m, n - m) * z - kx;
		t = clamp( t, 0.0, 1.0 );

		// 3 roots
		vec2 qos = d + (c + b*t.x)*t.x;
		float dis = dot(qos,qos);
        
		res = dis;

		qos = d + (c + b*t.y)*t.y;
		dis = dot(qos,qos);
		res = min(res,dis);
		
		qos = d + (c + b*t.z)*t.z;
		dis = dot(qos,qos);
		res = min(res,dis);

		res = sqrt( res );
	}
    
	return res;
}


//http://mathworld.wolfram.com/HeartCurve.html
vec2 getHeartPosition(float t){
	return vec2(16.0 * sin(t) * sin(t) * sin(t),
							-(13.0 * cos(t) - 5.0 * cos(2.0*t)
							- 2.0 * cos(3.0*t) - cos(4.0*t)));
}

//https://www.shadertoy.com/view/3s3GDn
float getGlow(float dist, float radius, float intensity){
	return pow(radius/dist, intensity);
}

float getSegment(float t, vec2 pos, float offset, float scale){
	for(int i = 0; i < POINT_COUNT; i++){
		points[i] = getHeartPosition(offset + float(i)*len + fract(speed * t) * 6.28);
	}
    
	vec2 c = (points[0] + points[1]) / 2.0;
	vec2 c_prev;
	float dist = 10000.0;
    
	for(int i = 0; i < POINT_COUNT-1; i++){
		//https://tinyurl.com/y2htbwkm
		c_prev = c;
		c = (points[i] + points[i+1]) / 2.0;
		dist = min(dist, sdBezier(pos, scale * c_prev, scale * points[i], scale * c));
	}
	return max(0.0, dist);
}

void main(){
	vec2 uv = gl_FragCoord.xy/resolution.xy;
	float widthHeightRatio = resolution.x/resolution.y;
	vec2 centre = vec2(0.5, 0.5);
	vec2 pos = centre - uv;
	pos.y /= widthHeightRatio;
	//Shift upwards to centre heart
	pos.y += 0.02;
	float scale = 0.000015 * height;
	
	float t = time;
    
	//Get first segment
  float dist = getSegment(t, pos, 0.0, scale);
  float glow = getGlow(dist, radius, intensity);
  
  vec3 col = vec3(0.0);

	//White core
  col += 10.0*vec3(smoothstep(0.003, 0.001, dist));
  //Pink glow
  col += glow * vec3(1.0,0.05,0.3);
  
  //Get second segment
  dist = getSegment(t, pos, 3.4, scale);
  glow = getGlow(dist, radius, intensity);
  
  //White core
  col += 10.0*vec3(smoothstep(0.003, 0.001, dist));
  //Blue glow
  col += glow * vec3(0.1,0.4,1.0);
        
	//Tone mapping
	col = 1.0 - exp(-col);

	//Gamma
	col = pow(col, vec3(0.4545));

	//Output to screen
 	gl_FragColor = vec4(col,1.0);
}
`;

//************** Utility functions **************

window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
	gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform1f(widthHandle, window.innerWidth);
  gl.uniform1f(heightHandle, window.innerHeight);
}


//Compile shader and combine with source
function compileShader(shaderSource, shaderType){
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
  	throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
  }
  return shader;
}

//From https://codepen.io/jlfwong/pen/GqmroZ
//Utility to complain loudly if we fail to find the attribute/uniform
function getAttribLocation(program, name) {
  var attributeLocation = gl.getAttribLocation(program, name);
  if (attributeLocation === -1) {
  	throw 'Cannot find attribute ' + name + '.';
  }
  return attributeLocation;
}

function getUniformLocation(program, name) {
  var attributeLocation = gl.getUniformLocation(program, name);
  if (attributeLocation === -1) {
  	throw 'Cannot find uniform ' + name + '.';
  }
  return attributeLocation;
}

//************** Create shaders **************

//Create vertex and fragment shaders
var vertexShader = compileShader(vertexSource, gl.VERTEX_SHADER);
var fragmentShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER);

//Create shader programs
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

gl.useProgram(program);

//Set up rectangle covering entire canvas 
var vertexData = new Float32Array([
  -1.0,  1.0, 	// top left
  -1.0, -1.0, 	// bottom left
   1.0,  1.0, 	// top right
   1.0, -1.0, 	// bottom right
]);

//Create vertex buffer
var vertexDataBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

// Layout of our data in the vertex buffer
var positionHandle = getAttribLocation(program, 'position');

gl.enableVertexAttribArray(positionHandle);
gl.vertexAttribPointer(positionHandle,
  2, 				// position is a vec2 (2 values per component)
  gl.FLOAT, // each component is a float
  false, 		// don't normalize values
  2 * 4, 		// two 4 byte float components per vertex (32 bit float is 4 bytes)
  0 				// how many bytes inside the buffer to start from
  );

//Set uniform handle
var timeHandle = getUniformLocation(program, 'time');
var widthHandle = getUniformLocation(program, 'width');
var heightHandle = getUniformLocation(program, 'height');

gl.uniform1f(widthHandle, window.innerWidth);
gl.uniform1f(heightHandle, window.innerHeight);

var lastFrame = Date.now();
var thisFrame;

function draw(){
	
  //Update time
	thisFrame = Date.now();
  time += (thisFrame - lastFrame)/1000;	
	lastFrame = thisFrame;

	//Send uniforms to program
  gl.uniform1f(timeHandle, time);
  //Draw a triangle strip connecting vertices 0-4
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(draw);
}

draw();