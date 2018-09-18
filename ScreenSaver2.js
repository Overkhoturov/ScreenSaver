function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set (0, 0, 700);

    var geometry = new THREE.CubeGeometry( 50, 50, 50);

    for ( var i = 0; i < geometry.faces.length; i += 2 ) {
        var hex = Math.random() * 0xffffff;
        geometry.faces[ i ].color.setHex( hex );
        geometry.faces[ i + 1 ].color.setHex( hex );
    }

    var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
    cube = new Cube ( new THREE.Mesh( geometry, material ) );
    scene.add( cube.mesh );    

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    var renderarea = document.getElementById('render-area');
    renderarea.appendChild( renderer.domElement );
    
    window.addEventListener( 'resize', onWindowResize, false );
}

var edge = [408.67, 358.67];
var camera, scene, renderer,cube
    
function Cube( mesh ) {
    this.mesh = mesh;
    this.direction = [ 
        Math.round(Math.random()) == 1 ? 1 : -1, 
        Math.round(Math.random()) == 1 ? 1 : -1,
        ];

        this.speedX = 5;
        this.speedY = 10;
        
    this.updatePosition = function () {
        this.mesh.position.x += this.direction[0] * this.speedX;
        this.mesh.position.y += this.direction[1] * this.speedY;
        this.mesh.rotation.x = Date.now() * 0.005;
        this.mesh.rotation.y = Date.now() * 0.005;
    }
    
    this.updateDirection = function() {
        if (Math.abs(this.mesh.position.x) > edge[0]) {
            this.direction[0] = -this.direction[0];
        }
        if (Math.abs(this.mesh.position.y) > edge[1]) {
            this.direction[1] = -this.direction[1];
        }
    }
}
        
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
        cube.updatePosition();
        cube.updateDirection();
        requestAnimationFrame( animate );
        render();    
}
    
function render() {
    renderer.render( scene, camera );
}

var main = function() {
    init();
    animate();   
}