
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "green" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// יצירת GUI
const gui = new dat.GUI();

// הוספת הפרמטרים ל-GUI וקביעת תחום ערכים אפשרי
const params = {
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  color: "green", // צבע התחלתי
  autoRotate: false // משתנה בוליאני לסיבוב אוטומטי
};

// מערך שמכיל את הצבעים האפשריים
const colorsArray = ["red", "green", "blue", "yellow", "purple"];

const updateRotation = () => {
  cube.rotation.x = params.rotationX;
  cube.rotation.y = params.rotationY;
  cube.rotation.z = params.rotationZ;
};

const updatePosition = () => {
  cube.position.x = params.positionX;
  cube.position.y = params.positionY;
  cube.position.z = params.positionZ;
};

const updateColor = () => {
  cube.material.color.set(params.color); // הגדרת צבע החומר של הקוביה לפי הערך שנבחר
};

const startAutoRotation = () => {
  autoRotationInterval = setInterval(() => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
  }, 16); // סיבוב בקצב כ-60 פריימים לשנייה
};

const stopAutoRotation = () => {
  clearInterval(autoRotationInterval);
};
const rotationFolder = gui.addFolder('Rotation');
rotationFolder.add(params, 'rotationX', 0, 5).name('Rotation X').onChange(updateRotation);
rotationFolder.add(params, 'rotationY', 0, 5).name('Rotation Y').onChange(updateRotation);
rotationFolder.add(params, 'rotationZ', 0, 5).name('Rotation Z').onChange(updateRotation);

const positionFolder = gui.addFolder('Position');
positionFolder.add(params, 'positionX', -5, 5).name('Position X').onChange(updatePosition);
positionFolder.add(params, 'positionY', -5, 5).name('Position Y').onChange(updatePosition);
positionFolder.add(params, 'positionZ', -5, 5).name('Position Z').onChange(updatePosition);

gui.add(params, 'color', colorsArray).name('Color').onChange(updateColor);

gui.add(params, 'autoRotate').name('Auto Rotate').onChange(() => {
  if (params.autoRotate) {
    startAutoRotation();
  } else {
    stopAutoRotation();
  }
});


const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
