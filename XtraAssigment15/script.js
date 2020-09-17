var game = new Game();

//Käynnistä peli
function init() {
	if(game.init())
		game.start();
}


//Tallennetaan kuvat kaikki omaan objektiin
var imageRepository = new function() {
	// Alusta kuvat
	this.background = new Image();
	this.spaceship = new Image();
	this.bullet = new Image();
	// Varmistus että kaikki on ladannut
	var numImages = 3;
	var numLoaded = 0;
	function imageLoaded() {
		numLoaded++;
		if (numLoaded === numImages) {
			window.init();
		}
	}
	this.background.onload = function() {
		imageLoaded(); //imageLoaded varmistus että image on latautunut
	}
	this.spaceship.onload = function() {
		imageLoaded();
	}
	this.bullet.onload = function() {
		imageLoaded();
	}

	this.background.src = "images/bg-img.jpg";
	this.spaceship.src = "images/mario.png";
	this.bullet.src = "images/bullet.png";
}


//Abstract pohja kaikille objekteille
function Drawable() {
	this.init = function(x, y, width, height) {
		// Defaultit
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
}

//Taustakuva
function Background() {
	this.speed = 1; 
	this.draw = function() {
		this.y += this.speed;
		this.context.drawImage(imageRepository.background, this.x, this.y);

		this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);


		if (this.y >= this.canvasHeight)
			this.y = 0;
	};
}

Background.prototype = new Drawable();

function Game() {

	this.init = function() {
		// haetaan kanvakset
		this.bgCanvas = document.getElementById('background');
		this.shipCanvas = document.getElementById('ship');
		this.mainCanvas = document.getElementById('main');

		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
			this.shipContext = this.shipCanvas.getContext('2d');
			this.mainContext = this.mainCanvas.getContext('2d');

			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;
			Ship.prototype.context = this.shipContext;
			Ship.prototype.canvasWidth = this.shipCanvas.width;
			Ship.prototype.canvasHeight = this.shipCanvas.height;
			Bullet.prototype.context = this.mainContext;
			Bullet.prototype.canvasWidth = this.mainCanvas.width;
			Bullet.prototype.canvasHeight = this.mainCanvas.height;
			// alustetaan taustakuva
			this.background = new Background();
			this.background.init(0,0); // Set draw point to 0,0
			//alustetaan alus
			this.ship = new Ship();

			var shipStartX = this.shipCanvas.width/4 - imageRepository.spaceship.width;
			var shipStartY = this.shipCanvas.height/4 + imageRepository.spaceship.height*2;
			this.ship.init(shipStartX, shipStartY, imageRepository.spaceship.width,
			               imageRepository.spaceship.height);
			return true;
		} else {
			return false;
		}
	};
	// Käynnistä animaatio
	this.start = function() {
		this.ship.draw();
		animate();
	};
}


function animate() {
	requestAnimFrame( animate );
	game.background.draw();
	game.ship.move();
	game.ship.bulletPool.animate();
}


window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback,  element){
				window.setTimeout(callback, 1000 / 60);
			};
})();

//Sääteleee ammusten lukumäärää
function Pool(maxSize) {
	var size = maxSize; // Maximi ammusten määrä
	var pool = [];

	this.init = function() {
		for (var i = 0; i < size; i++) {
			// Luodaan bullet
			var bullet = new Bullet();
			bullet.init(0,0, imageRepository.bullet.width,
			            imageRepository.bullet.height);
			pool[i] = bullet;
		}
	};
	

	this.get = function(x, y, speed) {
		if(!pool[size - 1].alive) {
			pool[size - 1].spawn(x, y, speed);
			pool.unshift(pool.pop());
		}
	};

	this.getOne = function(x1, y1, speed1) {
		if(!pool[size - 1].alive) {
				this.get(x1, y1, speed1);
			 }
	};


	this.animate = function() {
		for (var i = 0; i < size; i++) {
			if (pool[i].alive) {
				if (pool[i].draw()) {
					pool[i].clear();
					pool.push((pool.splice(i,1))[0]);
				}
			}
			else
				break;
		}
	};
}

//Ammukset
function Bullet() {
	this.alive = false; // jos true ammus on olemassa
	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.alive = true;
	};

	this.draw = function() {
		this.context.clearRect(this.x, this.y, this.width, this.height);
		this.y -= this.speed;
		if (this.y <= 0 - this.height) {
			return true;
		}
		else {
			this.context.drawImage(imageRepository.bullet, this.x, this.y);
		}
	};

	// bulletin settingsien palauttaminen
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
	};
}
Bullet.prototype = new Drawable();

//Aluken määritys
function Ship() {
	this.speed = 2;
	this.bulletPool = new Pool(50);
	this.bulletPool.init();
	var fireRate = 20;
	var counter = 0;
	this.draw = function() {
		this.context.drawImage(imageRepository.spaceship, this.x, this.y);
	};
	this.move = function() {
		counter++;
		if (KEY_STATUS.left || KEY_STATUS.right ||
			KEY_STATUS.down || KEY_STATUS.up) {
			// poista vanha sijainti piirrä uudestaan
			this.context.clearRect(this.x, this.y, this.width, this.height);

			if (KEY_STATUS.left) {
				this.x -= this.speed
				if (this.x <= 0) 
					this.x = 0;
			} else if (KEY_STATUS.right) {
				this.x += this.speed
				if (this.x >= this.canvasWidth - this.width)
					this.x = this.canvasWidth - this.width;
			} else if (KEY_STATUS.up) {
				this.y -= this.speed
				if (this.y <= this.canvasHeight/20*3)
					this.y = this.canvasHeight/20*3;
			} else if (KEY_STATUS.down) {
				this.y += this.speed
				if (this.y >= this.canvasHeight - this.height)
					this.y = this.canvasHeight - this.height;
			}
			// Viimeistelte piirtäminen
			this.draw();
		}
		if (KEY_STATUS.space && counter >= fireRate) {
			this.fire();
			counter = 0;
		}
	};

	this.fire = function() {
		this.bulletPool.getOne(this.x+6, this.y+3, 3,);
		                       
	};
}
Ship.prototype = new Drawable();


/*Asteroid pelistä tuttu painallusten tallentaminen hash-mappiin, rekisteröi useamman näppäilyn sarjan
kuuntelee jatkuvasti päästettyjä ja painettuja näppäimiä truet = painettu falset ei painettu !
*/ 
KEY_CODES = {
	32: 'space',
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down',
  }
  
  KEY_STATUS = {};
  for (code in KEY_CODES) {
	KEY_STATUS[ KEY_CODES[ code ]] = false;
  }

  document.onkeydown = function(e) {

	var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
	if (KEY_CODES[keyCode]) {
	  e.preventDefault();
	  KEY_STATUS[KEY_CODES[keyCode]] = true;
	}
  }

  document.onkeyup = function(e) {
	var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
	if (KEY_CODES[keyCode]) {
	  e.preventDefault();
	  KEY_STATUS[KEY_CODES[keyCode]] = false;
	}
  }



