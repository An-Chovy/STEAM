/* =====================================================================
   FUTURE READY — SPACE ENGINE

   This file controls:
   1. The random photographic background library
   2. Interactive Webb-style stars and rare long-session events
   3. Mouse-triggered star twinkles
   4. The pinch-to-open Deep Field Explorer Easter egg
   5. The five-field Mission Log / Space Passport unlock
   6. Navigation, scroll reveals, modals, and forms

   PHOTO NAMING RULE
   -----------------
   Put WebP photographs inside: images/space/
   Name them: space-001.webp, space-002.webp, space-003.webp, etc.
   The code checks space-001.webp through space-060.webp automatically.
   You may add or remove a numbered photo without editing this file.
===================================================================== */

(() => {
  'use strict';

  document.documentElement.classList.add('motion-ready');

  const reducedMotion =
    matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = document.querySelector('#universe');
  let spacePhoto = document.querySelector('#spacePhoto');
  const context = canvas.getContext('2d', { alpha: true });

  /* Compatibility fallback */
  if (!spacePhoto) {
    spacePhoto = document.createElement('div');
    spacePhoto.id = 'spacePhoto';
    spacePhoto.className = 'space-photo';
    spacePhoto.setAttribute('aria-hidden', 'true');
    canvas.before(spacePhoto);
  }

  /* -----------------------------------------------------------------
     PHOTO LIBRARY
  ----------------------------------------------------------------- */

  const MAX_SPACE_PHOTOS = 60;
  const PHOTO_FOLDER = 'images/space/';

  const PHOTO_EXTENSIONS = [
    'webp',
    'jpg',
    'jpeg',
    'png',
    'avif'
  ];

  const starterPhotos = [
    `${PHOTO_FOLDER}space-001.webp`,
    `${PHOTO_FOLDER}space-002.webp`,
    `${PHOTO_FOLDER}space-003.webp`
  ];

  let availablePhotos = [...starterPhotos];
  let currentPhoto = starterPhotos[0];

  // Counts deliberate Collect-button clicks.
  let deepFieldNumber = 0;

  const photoDetailsCache = new Map();

  // Shuffled Easter-egg picture queue.
  let explorerPhotoQueue = [];

  function numberedPhotoPath(number, extension) {
    return `${PHOTO_FOLDER}space-${String(number).padStart(3, '0')}.${extension}`;
  }

  /*
     Builds an absolute address from the page itself.
     No Date.now() is used, so the browser can cache files.
  */
  function versionedPhotoUrl(path) {
    return new URL(path, document.baseURI).href;
  }

  function testPhoto(path) {
    return new Promise(resolve => {
      const image = new Image();

      image.onload = () => resolve(path);
      image.onerror = () => resolve(null);
      image.src = versionedPhotoUrl(path);
    });
  }

  /*
     Try each supported format. Only the first format found
     for each number is added.
  */
  async function findNumberedPhoto(number) {
    for (const extension of PHOTO_EXTENSIONS) {
      const path = numberedPhotoPath(number, extension);

      if (await testPhoto(path)) {
        return path;
      }
    }

    return null;
  }

  /* -----------------------------------------------------------------
     PHOTO TITLES AND DESCRIPTIONS

     Example:

     images/space/space-004.webp
     images/space/space-004.txt

     First nonempty TXT line = title.
     Remaining lines = description.
  ----------------------------------------------------------------- */

  async function loadPhotoDetails(path) {
    if (photoDetailsCache.has(path)) {
      return photoDetailsCache.get(path);
    }

    const textPath = path.replace(/\.[^.]+$/, '.txt');

    const fallbackNumber =
      path.match(/space-(\d+)/)?.[1] || 'UNKNOWN';

    const details = {
      title: `Deep-space observation ${fallbackNumber}`,
      description:
        'A telescope view from the Future Ready deep-space collection.'
    };

    try {
      const response =
        await fetch(versionedPhotoUrl(textPath));

      if (response.ok) {
        const lines = (await response.text())
          .split(/\r?\n/)
          .map(line => line.trim())
          .filter(Boolean);

        if (lines.length) {
          details.title = lines[0];
        }

        if (lines.length > 1) {
          details.description = lines.slice(1).join('\n');
        }
      }
    } catch (error) {
      /*
         Missing description files are allowed.
         The fallback title and description remain.
      */
    }

    photoDetailsCache.set(path, details);

    return details;
  }

  /* -----------------------------------------------------------------
     DISCOVER NUMBERED PICTURES
  ----------------------------------------------------------------- */

  async function discoverPhotoLibrary() {
    const results = await Promise.all(
      Array.from(
        { length: MAX_SPACE_PHOTOS },
        (_, index) => findNumberedPhoto(index + 1)
      )
    );

    const discovered = results.filter(Boolean);

    if (discovered.length) {
      availablePhotos = discovered;

      // Rebuild the Easter-egg deck using the complete library.
      explorerPhotoQueue = [];

      setRandomBackground();
      assignPortholePhotos();
    }
  }

  /* -----------------------------------------------------------------
     RANDOM PAGE BACKGROUND

     Avoids the current picture and the most recently selected
     background whenever multiple pictures are available.
  ----------------------------------------------------------------- */

  function chooseRandomPhoto(exclude = '') {
    const previousPhoto =
      sessionStorage.getItem('previousSpacePhoto');

    const choices = availablePhotos.filter(
      path =>
        path !== exclude &&
        path !== previousPhoto
    );

    const fallbackChoices = availablePhotos.filter(
      path => path !== exclude
    );

    const pool =
      choices.length
        ? choices
        : fallbackChoices.length
          ? fallbackChoices
          : availablePhotos;

    const selectedPhoto =
      pool[Math.floor(Math.random() * pool.length)];

    sessionStorage.setItem(
      'previousSpacePhoto',
      selectedPhoto
    );

    return selectedPhoto;
  }

  /* -----------------------------------------------------------------
     SHUFFLED EASTER-EGG DECK

     Every available picture appears once before any picture repeats.
     When the queue is empty, the pictures are shuffled again.
  ----------------------------------------------------------------- */

  function chooseNextExplorerPhoto(exclude = '') {
    if (!explorerPhotoQueue.length) {
      explorerPhotoQueue = [...availablePhotos];

      // Fisher–Yates shuffle.
      for (
        let index = explorerPhotoQueue.length - 1;
        index > 0;
        index -= 1
      ) {
        const randomIndex =
          Math.floor(Math.random() * (index + 1));

        [
          explorerPhotoQueue[index],
          explorerPhotoQueue[randomIndex]
        ] = [
          explorerPhotoQueue[randomIndex],
          explorerPhotoQueue[index]
        ];
      }

      /*
         Prevent the first picture of a new round from
         matching the picture that was just displayed.
      */
      if (
        explorerPhotoQueue.length > 1 &&
        explorerPhotoQueue[0] === exclude
      ) {
        [
          explorerPhotoQueue[0],
          explorerPhotoQueue[1]
        ] = [
          explorerPhotoQueue[1],
          explorerPhotoQueue[0]
        ];
      }
    }

    return explorerPhotoQueue.shift();
  }

  /* -----------------------------------------------------------------
     BACKGROUND DISPLAY
  ----------------------------------------------------------------- */

  function setBackground(path) {
    currentPhoto = path;

    const photoUrl = versionedPhotoUrl(path);

    document.documentElement.style.setProperty(
      '--space-image',
      `url("${photoUrl}")`
    );

    const orientationTest = new Image();

    orientationTest.onload = () => {
      const ratio =
        orientationTest.naturalWidth /
        orientationTest.naturalHeight;

      spacePhoto.dataset.fit =
        ratio >= 1.45 ? 'wide' : 'contained';
    };

    orientationTest.src = photoUrl;
  }

  function setRandomBackground() {
    setBackground(
      chooseRandomPhoto(currentPhoto)
    );
  }

  /* -----------------------------------------------------------------
     PORTHOLE PICTURES
  ----------------------------------------------------------------- */

  function assignPortholePhotos() {
    const shuffled = [...availablePhotos];

    // Fisher–Yates shuffle.
    for (
      let index = shuffled.length - 1;
      index > 0;
      index -= 1
    ) {
      const randomIndex =
        Math.floor(Math.random() * (index + 1));

      [
        shuffled[index],
        shuffled[randomIndex]
      ] = [
        shuffled[randomIndex],
        shuffled[index]
      ];
    }

    document
      .querySelectorAll('.experience-row')
      .forEach((row, index) => {
        const photo =
          shuffled[index % shuffled.length];

        row.style.setProperty(
          '--port-image',
          `url("${versionedPhotoUrl(photo)}")`
        );

        const port =
          row.querySelector('.observation-port');

        if (!port) return;

        port.dataset.photo = photo;

        loadPhotoDetails(photo).then(details => {
          if (port.dataset.photo === photo) {
            port.setAttribute(
              'aria-label',
              `Open observation: ${details.title}`
            );
          }
        });
      });
  }

  /*
     Show a picture immediately while the numbered library
     finishes being discovered.
  */
  setBackground(
    starterPhotos[
      Math.floor(Math.random() * starterPhotos.length)
    ]
  );

  assignPortholePhotos();
  discoverPhotoLibrary();

  /* -----------------------------------------------------------------
     CANVAS: INTERACTIVE STARS AND LIGHT TRAILS
  ----------------------------------------------------------------- */

  let width = 0;
  let height = 0;
  let pixelRatio = 1;

  let interactiveStars = [];
  let lightTrails = [];
  let nextLightTrail = 0;
  let timedEvents = [];

  function resizeCanvas() {
    pixelRatio =
      Math.min(devicePixelRatio || 1, 1.75);

    width = innerWidth;
    height = innerHeight;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.setTransform(
      pixelRatio,
      0,
      0,
      pixelRatio,
      0,
      0
    );

    makeInteractiveStars();
  }

  function makeInteractiveStars() {
    const count =
      Math.max(4, Math.floor(width / 390));

    interactiveStars = Array.from(
      { length: count },
      () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 18 + Math.random() * 24,

        color:
          Math.random() > 0.5
            ? [197, 232, 255]
            : [255, 224, 166],

        brightness:
          0.5 + Math.random() * 0.3,

        twinkle: 0,
        targetTwinkle: 0
      })
    );
  }

  function drawInteractiveStars(time) {
    context.save();

    context.globalCompositeOperation = 'screen';

    interactiveStars.forEach(star => {
      star.twinkle +=
        (star.targetTwinkle - star.twinkle) * 0.12;

      const pulse =
        0.97 +
        Math.sin(time * 0.00055 + star.x) * 0.03;

      const boost =
        1 + star.twinkle * 0.75;

      const angles = [
        0,
        Math.PI / 2,
        Math.PI / 4,
        Math.PI * 3 / 4
      ];

      angles.forEach((angle, index) => {
        const directionLength =
          star.length *
          (
            index === 0
              ? 1.75
              : index === 1
                ? 0.85
                : 1.05
          ) *
          boost;

        const dx =
          Math.cos(angle) * directionLength;

        const dy =
          Math.sin(angle) * directionLength;

        const gradient =
          context.createLinearGradient(
            star.x - dx,
            star.y - dy,
            star.x + dx,
            star.y + dy
          );

        gradient.addColorStop(
          0,
          `rgba(${star.color.join(',')},0)`
        );

        gradient.addColorStop(
          0.42,
          `rgba(${star.color.join(',')},${0.12 * boost})`
        );

        gradient.addColorStop(
          0.5,
          `rgba(${star.color.join(',')},${star.brightness * pulse * boost})`
        );

        gradient.addColorStop(
          0.58,
          `rgba(${star.color.join(',')},${0.12 * boost})`
        );

        gradient.addColorStop(
          1,
          `rgba(${star.color.join(',')},0)`
        );

        context.strokeStyle = gradient;
        context.lineWidth =
          0.65 + star.twinkle * 0.6;

        context.beginPath();

        context.moveTo(
          star.x - dx,
          star.y - dy
        );

        context.lineTo(
          star.x + dx,
          star.y + dy
        );

        context.stroke();
      });
    });

    context.restore();
  }

  function createLightTrail(time) {
    const direction =
      Math.random() > 0.5 ? 1 : -1;

    lightTrails.push({
      x:
        direction > 0
          ? -360
          : width + 360,

      y:
        height *
        (0.08 + Math.random() * 0.42),

      vx:
        direction *
        (7 + Math.random() * 4),

      vy:
        1.1 + Math.random() * 1.2,

      age: 0,

      lifespan:
        100 + Math.random() * 40,

      length:
        300 + Math.random() * 240
    });

    nextLightTrail =
      time +
      12000 +
      Math.random() * 16000;
  }

  function drawLightTrails(time) {
    if (
      !reducedMotion &&
      time > nextLightTrail
    ) {
      createLightTrail(time);
    }

    lightTrails.forEach(trail => {
      trail.x += trail.vx;
      trail.y += trail.vy;
      trail.age += 1;

      const visibility =
        Math.sin(
          Math.PI *
          trail.age /
          trail.lifespan
        );

      const speed =
        Math.hypot(trail.vx, trail.vy);

      const tailX =
        trail.x -
        (trail.vx / speed) * trail.length;

      const tailY =
        trail.y -
        (trail.vy / speed) * trail.length;

      const fade =
        context.createLinearGradient(
          tailX,
          tailY,
          trail.x,
          trail.y
        );

      fade.addColorStop(
        0,
        'rgba(145,210,255,0)'
      );

      fade.addColorStop(
        0.42,
        `rgba(175,224,255,${visibility * 0.11})`
      );

      fade.addColorStop(
        0.72,
        `rgba(225,244,255,${visibility * 0.26})`
      );

      fade.addColorStop(
        1,
        'rgba(255,255,255,0)'
      );

      context.strokeStyle = fade;
      context.lineWidth = 0.45;
      context.lineCap = 'butt';

      context.beginPath();
      context.moveTo(tailX, tailY);
      context.lineTo(trail.x, trail.y);
      context.stroke();
    });

    lightTrails = lightTrails.filter(
      trail => trail.age < trail.lifespan
    );
  }

  /* -----------------------------------------------------------------
     RARE LONG-SESSION SUPERNOVA
  ----------------------------------------------------------------- */

  function scheduleTimedEvents(time) {
    const novaExists =
      timedEvents.some(
        event => event.type === 'nova'
      );

    if (time > 65000 && !novaExists) {
      timedEvents.push({
        type: 'nova',
        start: time,
        duration: 6500,

        x:
          width *
          (0.2 + Math.random() * 0.6),

        y:
          height *
          (0.15 + Math.random() * 0.35)
      });
    }
  }

  function drawNova(event, time) {
    const progress =
      (time - event.start) /
      event.duration;

    if (
      progress < 0 ||
      progress > 1
    ) {
      return;
    }

    const peak =
      Math.sin(
        Math.PI *
        Math.min(1, progress * 1.4)
      );

    const radius =
      8 + progress * 230;

    const glow =
      context.createRadialGradient(
        event.x,
        event.y,
        0,
        event.x,
        event.y,
        radius
      );

    glow.addColorStop(
      0,
      `rgba(255,255,255,${0.82 * peak})`
    );

    glow.addColorStop(
      0.07,
      `rgba(126,226,255,${0.42 * peak})`
    );

    glow.addColorStop(
      0.28,
      `rgba(118,92,255,${0.12 * (1 - progress)})`
    );

    glow.addColorStop(
      1,
      'rgba(0,0,0,0)'
    );

    context.save();
    context.globalCompositeOperation = 'screen';
    context.fillStyle = glow;

    context.beginPath();

    context.arc(
      event.x,
      event.y,
      radius,
      0,
      Math.PI * 2
    );

    context.fill();
    context.restore();
  }

  function animationFrame(time) {
    context.clearRect(
      0,
      0,
      width,
      height
    );

    drawInteractiveStars(time);
    drawLightTrails(time);

    if (!reducedMotion) {
      scheduleTimedEvents(time);

      timedEvents.forEach(event => {
        if (event.type === 'nova') {
          drawNova(event, time);
        }
      });
    }

    requestAnimationFrame(animationFrame);
  }

  addEventListener(
    'pointermove',
    event => {
      interactiveStars.forEach(star => {
        const distance =
          Math.hypot(
            event.clientX - star.x,
            event.clientY - star.y
          );

        star.targetTwinkle =
          distance <
          Math.max(
            18,
            star.length * 0.55
          )
            ? 1
            : 0;
      });
    },
    { passive: true }
  );

  addEventListener('pointerleave', () => {
    interactiveStars.forEach(star => {
      star.targetTwinkle = 0;
    });
  });

  resizeCanvas();

  addEventListener(
    'resize',
    resizeCanvas
  );

  requestAnimationFrame(animationFrame);

  /* -----------------------------------------------------------------
     DEEP FIELD EXPLORER EASTER EGG
  ----------------------------------------------------------------- */

  const explorer =
    document.querySelector('#deepField');

  const explorerImage =
    document.querySelector('#deepFieldImage');

  const explorerCount =
    document.querySelector('#deepFieldCount');

  const explorerTitle =
    document.querySelector('#deepFieldTitle');

  const explorerDescription =
    document.querySelector('#deepFieldDescription');

  const explorerHint =
    document.querySelector('#deepFieldHint');

  const explorerRank =
    document.querySelector('#deepFieldRank');

  const explorerCollect =
    document.querySelector('#deepFieldCollect');

  const explorerDiscover =
    document.querySelector('#deepFieldDiscover');

  const missionLogUnlock =
    document.querySelector('#missionLogUnlock');

  const explorerClose =
    document.querySelector('.deep-field-close');

  let pinchStartDistance = 0;
  let explorerIsOpen = false;
  let explorerMode = 'easterEgg';

  function setObservationNotes(open) {
    explorer.classList.toggle(
      'details-open',
      open
    );

    explorerDiscover.setAttribute(
      'aria-expanded',
      String(open)
    );

    explorerDiscover
      .querySelector('span')
      .textContent =
        open ? 'HIDE NOTES' : 'DISCOVER';

    explorerDiscover
      .querySelector('b')
      .textContent =
        open
          ? 'Return to the full image'
          : 'Open observation notes';
  }

  function touchDistance(touches) {
    return Math.hypot(
      touches[0].clientX -
        touches[1].clientX,

      touches[0].clientY -
        touches[1].clientY
    );
  }

  async function displayExplorerPhoto(
    photo,
    mode
  ) {
    explorerMode = mode;
    explorerImage.dataset.path = photo;
    explorerImage.src =
      versionedPhotoUrl(photo);

    explorerTitle.textContent =
      'Loading observation…';

    explorerDescription.textContent =
      'Receiving deep-space field notes.';

    const details =
      await loadPhotoDetails(photo);

    /*
       Ignore a late response if another
       picture is already open.
    */
    if (
      explorerImage.dataset.path !== photo
    ) {
      return;
    }

    explorerTitle.textContent =
      details.title;

    explorerDescription.textContent =
      details.description;

    explorerImage.alt =
      details.title;
  }

  function updateCollectionProgress() {
    explorerCount.textContent =
      `STICKERS COLLECTED ${String(deepFieldNumber).padStart(2, '0')}`;

    if (deepFieldNumber < 5) {
      const remaining =
        5 - deepFieldNumber;

      explorerHint.textContent =
        `${remaining} sticker${remaining === 1 ? '' : 's'} until Mission Log unlock`;
    } else {
      missionLogUnlock.hidden = false;

      explorerHint.textContent =
        'Mission Log access confirmed';
    }

    if (deepFieldNumber >= 10) {
      explorerRank.textContent =
        'STAR CHASER // LEVEL 2';

      explorer.classList.add(
        'star-chaser'
      );
    }
  }

  function prepareNextDiscovery() {
    const nextPhoto =
      chooseNextExplorerPhoto(
        explorerImage.dataset.path ||
        currentPhoto
      );

    explorer.classList.remove(
      'porthole-view'
    );

    explorerRank.textContent =
      deepFieldNumber >= 10
        ? 'STAR CHASER // LEVEL 2'
        : 'DEEP FIELD EXPLORER';

    explorerCollect.disabled = false;

    explorerCollect
      .querySelector('b')
      .textContent =
        'Add sticker to Space Passport +';

    setObservationNotes(false);
    updateCollectionProgress();

    displayExplorerPhoto(
      nextPhoto,
      'easterEgg'
    );
  }

  function openExplorerShell() {
    if (!explorerIsOpen) {
      explorerIsOpen = true;
      explorer.hidden = false;

      document.body.classList.add(
        'deep-field-open'
      );

      history.pushState(
        { deepField: true },
        '',
        '#deep-field'
      );
    }
  }

  function openDeepField() {
    if (explorerIsOpen) return;

    openExplorerShell();
    prepareNextDiscovery();
  }

  function openPortholeObservation(photo) {
    openExplorerShell();

    explorer.classList.add(
      'porthole-view'
    );

    explorerRank.textContent =
      'PORTHOLE OBSERVATION';

    explorerCount.textContent =
      photo
        .match(/space-\d+/)?.[0]
        .toUpperCase() ||
      'DEEP-SPACE FIELD';

    explorerHint.textContent =
      'Close this observation to return to the showcase';

    setObservationNotes(false);

    displayExplorerPhoto(
      photo,
      'porthole'
    );
  }

  function hideDeepField() {
    explorerIsOpen = false;
    explorerMode = 'easterEgg';
    explorer.hidden = true;

    explorer.classList.remove(
      'porthole-view'
    );

    setObservationNotes(false);

    document.body.classList.remove(
      'deep-field-open'
    );
  }

  function closeDeepField() {
    if (history.state?.deepField) {
      history.back();
    } else {
      hideDeepField();
    }
  }

  addEventListener(
    'touchstart',
    event => {
      if (event.touches.length === 2) {
        pinchStartDistance =
          touchDistance(event.touches);
      }
    },
    { passive: true }
  );

  addEventListener(
    'touchmove',
    event => {
      if (
        event.touches.length !== 2 ||
        !pinchStartDistance
      ) {
        return;
      }

      const currentDistance =
        touchDistance(event.touches);

      if (
        currentDistance /
          pinchStartDistance >
        1.18
      ) {
        event.preventDefault();

        if (!explorerIsOpen) {
          openDeepField();
        }

        pinchStartDistance =
          currentDistance;
      }
    },
    { passive: false }
  );

  addEventListener(
    'touchend',
    () => {
      pinchStartDistance = 0;
    }
  );

  addEventListener(
    'popstate',
    () => {
      if (explorerIsOpen) {
        hideDeepField();
      }
    }
  );

  explorerClose.addEventListener(
    'click',
    closeDeepField
  );

  explorerDiscover.addEventListener(
    'click',
    () => {
      setObservationNotes(
        !explorer.classList.contains(
          'details-open'
        )
      );
    }
  );

  /*
     Porthole views show the exact assigned image
     and do not expose the Collect control.
  */
  document.addEventListener(
    'click',
    event => {
      const port =
        event.target.closest(
          '.observation-port'
        );

      if (port?.dataset.photo) {
        openPortholeObservation(
          port.dataset.photo
        );
      }
    }
  );

  /*
     Collecting a sticker advances to the next
     picture in the shuffled Easter-egg deck.
  */
  explorerCollect.addEventListener(
    'click',
    () => {
      if (
        explorerMode !== 'easterEgg' ||
        explorerCollect.disabled
      ) {
        return;
      }

      explorerCollect.disabled = true;
      deepFieldNumber += 1;

      updateCollectionProgress();

      explorerCollect
        .querySelector('b')
        .textContent =
          'Sticker collected ✓';

      setTimeout(() => {
        if (
          explorerIsOpen &&
          explorerMode === 'easterEgg'
        ) {
          prepareNextDiscovery();
        }
      }, 750);
    }
  );

  /*
     Desktop/preview fallback:
     double-click empty page space.
  */
  addEventListener(
    'dblclick',
    event => {
      if (
        explorerIsOpen ||
        event.target.closest(
          'a,button,input,select,textarea,label'
        )
      ) {
        return;
      }

      openDeepField();
    }
  );

  /*
     Ctrl/Cmd + upward wheel behaves like
     a desktop pinch-out.
  */
  addEventListener(
    'wheel',
    event => {
      if (
        !(event.ctrlKey || event.metaKey) ||
        event.deltaY >= 0
      ) {
        return;
      }

      event.preventDefault();

      if (!explorerIsOpen) {
        openDeepField();
      }
    },
    { passive: false }
  );

  /* -----------------------------------------------------------------
     STANDARD PAGE INTERACTIONS
  ----------------------------------------------------------------- */

  const menuButton =
    document.querySelector('.menu-button');

  const navigation =
    document.querySelector('#site-nav');

  menuButton.addEventListener(
    'click',
    () => {
      const isOpen =
        navigation.classList.toggle('open');

      menuButton.setAttribute(
        'aria-expanded',
        isOpen
      );
    }
  );

  navigation.addEventListener(
    'click',
    event => {
      if (
        event.target.closest('a,button')
      ) {
        navigation.classList.remove(
          'open'
        );

        menuButton.setAttribute(
          'aria-expanded',
          'false'
        );
      }
    }
  );

  addEventListener(
    'scroll',
    () => {
      document
        .querySelector('.site-header')
        .classList.toggle(
          'scrolled',
          scrollY > 25
        );
    },
    { passive: true }
  );

  const revealObserver =
    new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle(
            'visible',
            entry.isIntersecting
          );
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -7%'
      }
    );

  document
    .querySelectorAll('.reveal')
    .forEach(element => {
      revealObserver.observe(element);
    });

  /* -----------------------------------------------------------------
     MODAL CONTROLS
  ----------------------------------------------------------------- */

  const modals = {
    registration:
      document.querySelector(
        '#registrationModal'
      ),

    volunteer:
      document.querySelector(
        '#volunteerModal'
      ),

    directions:
      document.querySelector(
        '#directionsModal'
      ),

    missionLog:
      document.querySelector(
        '#missionLogModal'
      )
  };

  let lastFocusedElement;

  function openModal(name) {
    const modal = modals[name];

    if (!modal) return;

    lastFocusedElement =
      document.activeElement;

    modal.hidden = false;

    document.body.classList.add(
      'modal-open'
    );

    setTimeout(() => {
      modal
        .querySelector(
          'input,select,a,button'
        )
        ?.focus();
    }, 0);
  }

  function closeModal(modal) {
    modal.hidden = true;

    document.body.classList.remove(
      'modal-open'
    );

    lastFocusedElement?.focus();
  }

  missionLogUnlock.addEventListener(
    'click',
    () => {
      hideDeepField();

      if (history.state?.deepField) {
        history.back();
      }

      setTimeout(
        () => openModal('missionLog'),
        80
      );
    }
  );

  document.addEventListener(
    'click',
    event => {
      const opener =
        event.target.closest(
          '[data-open]'
        );

      const closer =
        event.target.closest(
          '[data-close]'
        );

      if (opener) {
        openModal(
          opener.dataset.open
        );
      }

      if (closer) {
        closeModal(
          closer.closest('.modal')
        );
      }

      if (
        event.target.classList.contains(
          'modal'
        )
      ) {
        closeModal(event.target);
      }
    }
  );

  document.addEventListener(
    'keydown',
    event => {
      if (event.key !== 'Escape') {
        return;
      }

      if (explorerIsOpen) {
        closeDeepField();
        return;
      }

      const openModalElement =
        document.querySelector(
          '.modal:not([hidden])'
        );

      if (openModalElement) {
        closeModal(openModalElement);
      }
    }
  );

  /* -----------------------------------------------------------------
     FORMSPREE FORM HANDLING
  ----------------------------------------------------------------- */

  function connectForm(
    selector,
    endpoint,
    successMessage
  ) {
    const form =
      document.querySelector(selector);

    if (!form) return;

    form.addEventListener(
      'submit',
      async event => {
        event.preventDefault();

        const button =
          form.querySelector(
            '[type=submit]'
          );

        const status =
          form.querySelector(
            '.form-status'
          );

        button.disabled = true;

        status.textContent =
          'Transmitting…';

        try {
          const response =
            await fetch(endpoint, {
              method: 'POST',
              body: new FormData(form),

              headers: {
                Accept: 'application/json'
              }
            });

          if (!response.ok) {
            throw new Error(
              'Form submission failed'
            );
          }

          form.reset();

          status.textContent =
            successMessage;

          button.textContent =
            'Received ✓';
        } catch (error) {
          status.textContent =
            'Transmission failed. Check your connection and try again.';

          button.disabled = false;
        }
      }
    );
  }

  connectForm(
    '#partnerForm',
    'https://formspree.io/f/xlgqzvbj',
    'Registration complete. Kevin will contact you soon.'
  );

  connectForm(
    '#volunteerForm',
    'https://formspree.io/f/xlgqzqye',
    'You’re signed up. Our team will follow up closer to the event.'
  );

  connectForm(
    '#spacePassportForm',
    'https://formspree.io/f/xaqrgvky',
    'Space Passport received! Mission entry confirmed.'
  );
})();