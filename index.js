if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  top.location.href = "index-m.html";
}
var launched = 0;
var k = 0.1;
var x = 0.00029;
var y = 0.00075;
var anis = 16;
var scale = 1.005;
var mainPosition = [-80.5774 + x, 28.56218 + y];
if (!config)
  console.error(
    "Config not set! Make a copy of 'config_template.js', add in your access token, and save the file as 'config.js'."
  );
mapboxgl.accessToken = config.accessToken;
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  center: [-80.57731, 28.562],
  zoom: 17.0,
  bearing: 180,
  pitch: 60,
  heading: 41,
  maxZoom: 19
});
var highlighted = [];
map.on("load", function() {
  var smap = 1;
  var ssat = 0;
  function setmap() {
    if (smap == 0) {
      map.setStyle("mapbox://styles/mapbox/streets-v9");
      document.getElementById("m").src = "buttons/map2.png";
      document.getElementById("s").src = "buttons/satellite1.png";
      smap = 1;
      ssat = 0;
    }
  }
  function setsat() {
    if (smap == 1) {
      map.setStyle("mapbox://styles/mapbox/satellite-v9");
      document.getElementById("m").src = "buttons/map1.png";
      document.getElementById("s").src = "buttons/satellite2.png";
      smap = 0;
      ssat = 1;
    }
  }
  document.getElementById("m").addEventListener("click", function() {
    setmap();
  });
  document.getElementById("s").addEventListener("click", function() {
    setsat();
  });
  // Initialize threebox
  window.threebox = new Threebox(map);
  threebox.setupDefaultLights();
  THREE.Cache.enabled = true;
  THREE.DefaultLoadingManager.onStart = function(url, itemsLoaded, itemsTotal) {
    document.getElementById("loadingtext").innerHTML =
      "Started loading file: " +
      url +
      ".\nLoaded " +
      itemsLoaded +
      " of " +
      itemsTotal +
      " files.";
  };
  THREE.DefaultLoadingManager.onLoad = function() {
    document.getElementById("loadingtext").innerHTML = "Loading Complete!";
    var tween = new TWEEN.Tween(document.getElementById("loading").style)
      .to({ opacity: 0.1 }, 1100)
      .start();
    tween.easing(TWEEN.Easing.Cubic.Out);
    tween.yoyo(true);
    tween.onComplete(function() {
      //console.log('done!')
      document.getElementById("loading").style.zIndex = -100;
    });
  };
  THREE.DefaultLoadingManager.onProgress = function(
    url,
    itemsLoaded,
    itemsTotal
  ) {
    document.getElementById("loadingtext").innerHTML =
      "Loading file: " +
      url +
      ".\nLoaded " +
      itemsLoaded +
      " of " +
      itemsTotal +
      " files.";
    document.getElementById("loading").style.opacity = 1;
  };
  THREE.DefaultLoadingManager.onError = function(url) {
    document.getElementById("loadingtext").innerHTML =
      "There was an error loading " + url;
  };
  loader = new THREE.JSONLoader();

  var models = [
    {
      src: 'model/b1/b1',
      emissive: 'model/b1/b1.jpg',
      name: 'ground'
    },
    {
      src: 'model/bt/bt1',
      emissive: 'model/bt/bt.jpg',
      name: 'ground',
      alpha: 'model/bt/bt-a.jpg',
    },
    {
      src: 'model/bt/bt2',
      emissive: 'model/bt/bt.jpg',
      name: 'ground',
      alpha: 'model/bt/bt-a.jpg',
    },
    {
      src: 'model/bt/bt3',
      emissive: 'model/bt/bt.jpg',
      name: 'ground',
      alpha: 'model/bt/bt-a.jpg'
    },
    {
      src: 'model/bt/bt4',
      emissive: 'model/bt/bt.jpg',
      name: 'ground',
      alpha: 'model/bt/bt-a.jpg'
    },
    {
      src: 'model/el1/el1',
      emissive: 'model/el1/el1.jpg',
      name: 'ground',
      alpha: 'model/el1/el1-a.jpg'
    },
    {
      src: 'model/el2/el2',
      emissive: 'model/el2/el2.jpg',
      name: 'ground'
    },
    {
      src: 'model/el3/el3',
      emissive: 'model/el3/el3.jpg',
      name: 'ground'
    },
    {
      src: 'model/el4/el4',
      emissive: 'model/el4/el4.jpg',
      name: 'ground'
    },
    {
      src: 'model/el5/el5',
      emissive: 'model/el5/el5.jpg',
      name: 'ground'
    },
    {
      src: 'model/el8/el8',
      emissive: 'model/el8/el8.jpg',
      name: 'ground'
    },
    {
      src: 'model/el9/el9',
      emissive: 'model/el9/el9.jpg',
      name: 'ground'
    },
    {
      src: 'model/el10/el10',
      emissive: 'model/el10/el10.jpg',
      name: 'ground'
    },
    {
      src: 'model/el11/el11',
      emissive: 'model/el11/el11.jpg',
      name: 'ground'
    },
    {
      src: 'model/el12/el12',
      emissive: 'model/el11/el11.jpg',
      name: 'ground'
    },
    {
      src: 'model/el13/el13',
      emissive: 'model/el11/el11.jpg',
      name: 'ground'
    },
    {
      src: 'model/el14/el14',
      emissive: 'model/el11/el11.jpg',
      name: 'ground',
    },
    {
      src: 'model/el15/el15',
      emissive: 'model/el15/el15.jpg',
      name: 'ground',
    },
    {
      src: 'model/fh/fh',
      emissive: 'model/fh/fh.jpg',
      name: 'fh'
    },
    {
      src: 'model/ground/ground',
      emissive: 'model/ground/ground.jpg',
      name: 'ground',
    },
    {
      src: 'model/ground2/ground2',
      emissive: 'model/ground2/ground2.jpg',
      name: 'ground2',
    },
    {
      src: 'model/house/house',
      emissive: 'model/house/house.jpg',
      name: 'house',
    },
    {
      src: 'model/house2/house2',
      emissive: 'model/house2/house2.jpg',
      name: 'house2',
    },
    {
      src: 'model/radar/radar1',
      emissive: 'model/radar/radar.jpg',
      name: 'ground'
    },
    {
      src: 'model/radar/radar2',
      emissive: 'model/radar/radar.jpg',
      name: 'ground'
    },
    {
      src: 'model/start/start',
      emissive: 'model/start/start.jpg',
      alpha: 'model/start/start-a.jpg',
      name: 'ground'
    },
    {
      src: 'model/start2/start2',
      emissive: 'model/start2/start2.jpg',
      name: 'ground'
    },
    {
      src: 'model/tower/t1',
      emissive: 'model/tower/t.jpg',
      alpha: 'model/tower/t-a.jpg',
      name: 'ground',
    },
    {
      src: 'model/tower/t2',
      emissive: 'model/tower/t.jpg',
      alpha: 'model/tower/t-a.jpg',
      name: 'ground',
    },
    {
      src: 'model/tower/t3',
      emissive: 'model/tower/t.jpg',
      alpha: 'model/tower/t-a.jpg',
      name: 'ground',
    },
    {
      src: 'model/tower/t4',
      emissive: 'model/tower/t.jpg',
      alpha: 'model/tower/t-a.jpg',
      name: 'ground',
    }
  ]

  function loadModel(model){
    loader.load(`${model.src}.json`, function(geometry, materials) {
      geometry.rotateY(90 / 360 * 4 * Math.PI - 0.01);
      geometry.rotateX(90 / 360 * 2 * Math.PI);
      var material = new THREE.MeshPhongMaterial();
      material.emissive = new THREE.Color(0xffffff);
      material.color = new THREE.Color(0x0a0a0a);
      material.emissiveMap = new THREE.TextureLoader().load(model.emissive);
      material.shading = THREE.FlatShading;
      material.side = THREE.DoubleSide;

      if(model.alpha) {
        material.alphaMap = new THREE.TextureLoader().load(model.alpha);
        material.alphaTest = 0.2;
        material.transparent = true;
      }

      material.anisotropy = anis;
      geometry.castShadow = true;
      geometry.receiveShadow = false;
      geom = new THREE.Mesh(geometry, material);
      geom.name = model.name;
      threebox.addAtCoordinate(geom, mainPosition, {
        scaleToLatitude: true,
        preScale: scale
      });
      geom.position.setX(geom.position.x - 2.4);
      geom.position.setY(geom.position.y + 3.5);
    });
  }

  models.forEach(model => {
    loadModel(model)
  })

  loader.load("model/flame/flame.json", function(geometry, materials) {
    geometry.rotateY(90 / 360 * 4 * Math.PI - 0.01);
    geometry.rotateX(90 / 360 * 2 * Math.PI);
    var material = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture("model/flame.png")
    });
    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    // material.map.repeat.set( 10, 10 );
    material.side = THREE.DoubleSide;
    material.alphaTest = 0.1;
    material.transparent = true;
    geometry.castShadow = true;
    geometry.receiveShadow = false;
    geom = new THREE.Mesh(geometry, material);
    geom.name = "flame";
    threebox.addAtCoordinate(geom, mainPosition, {
      scaleToLatitude: true,
      preScale: scale
    });
    geom.position.setX(geom.position.x - 2.4);
    geom.position.setY(geom.position.y + 3.5);
  });

  var clicked = 0;
  var audio = new Audio("model/misc.mp3");
  var timeleft = 24;//24
  var timecheck = 24;//24

  var zoomOut = false;

  function go() {
    if (launched == 0) {
      if (timecheck <= 0) {
        document.getElementById("two").src = "img/gif.gif";
        $("#three").fadeIn("slow", function() {});
        launched = 1;
        document.getElementById("launch").innerHTML = "IGNITION";
        // var tween = new TWEEN.Tween( threebox.scene.getObjectByName( "fh").position).to({z:300},2900).start();
        setTimeout(()=>{
          map.rotateTo(200, {
            duration: 9000,
          })
        }, 1000)
        var tween = new TWEEN.Tween(
          threebox.scene.getObjectByName("fh").position
        )
          .to({ z: 250 }, 10000)
          .start();
        tween.easing(TWEEN.Easing.Exponential.In);
        tween.yoyo(true);
        tween.onComplete(function() {
          //	launched=0;
          map.flyTo({
            zoom: 15.4
          });
          setTimeout(()=>{
            map.rotateTo(240, {
              duration: 9000,
            })
          }, 1000)
          launched = 1;
          var tween = new TWEEN.Tween(
            threebox.scene.getObjectByName("fh").position
          )
            .to({ z: 500 }, 10000)
            .start();
          // tween.easing(TWEEN.Easing.Exponential.In);
          tween.yoyo(true);
          tween.onComplete(function() {
              //	launched=0;
              map.flyTo({
                zoom: 14.0
              });
              setTimeout(()=>{
                map.rotateTo(0, {
                  duration: 75000,
                })
              }, 1000)
              launched = 1;
              var tween = new TWEEN.Tween(
                threebox.scene.getObjectByName("fh").position
              )
                .to({ z: 4000 }, 80000)
                .start();
              tween.yoyo(true);
              tween.onComplete(function() {
                launched = 0;
                console.log("2nd stage done");
                $("#menu").fadeOut("slow", function() {});
                $("#two").fadeOut("slow", function() {});
                $("#three").fadeOut("slow", function() {});
              });
            });
          });
      }

    }
  }

  function launch() {
    $("#two").fadeIn("slow", function() {});

    audio.play();
    var downloadTimer = setInterval(function() {
      if (timeleft < 11) {
        document.getElementById("launch").innerHTML = "00:00:0" + --timeleft;
      } else {
        document.getElementById("launch").innerHTML = "00:00:" + --timeleft;
      }
      timecheck = timecheck - 1;
      if (timeleft <= 0) clearInterval(downloadTimer);
      go();
    }, 1000);

    map.rotateTo(300, {
      duration: 8000,
    })
    window.setTimeout(()=>{
      map.rotateTo(60, {
        duration: 8000,
      })
    }, 8000)
    window.setTimeout(()=>{
      map.rotateTo(180, {
        duration: 8000,
      })
    }, 16000)

  }
  document.getElementById("launch").onclick = function() {
    if (clicked == 0) {
      launch();
      clicked = 1;
    }
  };
});

requestAnimationFrame(animate);
function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
  if (launched == 1) {
    threebox.scene
      .getObjectByName("flame")
      .position.setZ(threebox.scene.getObjectByName("fh").position.z);
  } else {
    try {
      threebox.scene.getObjectByName("flame").position.setZ(-100000000000000);
    } catch (err) {}
  }

  try {
    threebox.scene.getObjectByName("flame").material.map.offset.y =
      threebox.scene.getObjectByName("flame").material.map.offset.y + 0.04;
  } catch (err) {}
}
