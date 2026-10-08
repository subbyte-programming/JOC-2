;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};


	var fullHeight = function() {
		var resizeScheduled = false;
		var setHeight = function() {
			$('.js-fullheight').css('height', window.innerHeight);
		};

		setHeight();
		$(window).on('resize orientationchange', function() {
			if (resizeScheduled) {
				return;
			}

			resizeScheduled = true;
			window.requestAnimationFrame(function() {
				setHeight();
				resizeScheduled = false;
			});
		});
	};

	var burgerMenu = function() {

		$('.js-colorlib-nav-toggle').on('click', function(event) {
			event.preventDefault();
			var menuIsOpen = $('body').hasClass('menu-show');
			if (menuIsOpen) {
				$('body').removeClass('menu-show');
				$('#colorlib-main-nav > .js-colorlib-nav-toggle').removeClass('show');
			} else {
				$('body').addClass('menu-show');
				setTimeout(function(){
					$('#colorlib-main-nav > .js-colorlib-nav-toggle').addClass('show');
				}, 900);
			}
			$('.js-colorlib-nav-toggle[aria-controls="colorlib-main-nav"]').attr('aria-expanded', String(!menuIsOpen));
		});
	};

	var siteSearch = function() {
		var $form = $('#site-search');
		var $pages = $('#colorlib-main-nav ul li');

		if (!$form.length || !$pages.length) {
			return;
		}

		var $status = $('<p class="sr-only" role="status" aria-live="polite"></p>');
		$form.append($status);

		var filterPages = function() {
			var query = $.trim($('#search').val()).toLocaleLowerCase();
			var matches = 0;

			$pages.each(function() {
				var matchesQuery = !query || $(this).text().toLocaleLowerCase().indexOf(query) !== -1;
				this.hidden = !matchesQuery;
				if (matchesQuery) {
					matches++;
				}
			});

			$status.text(query ? matches + (matches === 1 ? ' page found.' : ' pages found.') : '');
		};

		$form.on('input', '#search', filterPages);
		$form.on('submit', function(event) {
			event.preventDefault();
			filterPages();
		});
	};

	var siteChrome = function() {
		var footerMarkup = '<div class="bato-footer-main">' +
			'<div class="bato-footer-brand"><a href="index.html" aria-label="JOC Architectural Photography home"><img src="images/joc-logo.svg" alt="" width="176" height="42"><span>Architecture, interiors &amp; thoughtful visual stories.</span></a></div>' +
			'<nav class="bato-footer-links" aria-label="Footer navigation">' +
				'<a href="work.html">Portfolio</a><a href="services.html">Services</a><a href="about.html">About</a><a href="blog.html">Journal</a><a href="contact.html">Contact</a>' +
			'</nav>' +
			'<a class="bato-footer-booking" href="contact.html?inquiry=appointment#project-inquiry">Plan a photography appointment <span aria-hidden="true">&rarr;</span></a>' +
		'</div>' +
		'<div class="bato-footer-legal">' +
			'<span>&copy; ' + new Date().getFullYear() + ' JOC Architectural Photography. All rights reserved.</span>' +
			'<span>Website template by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a> (CC BY 3.0), distributed by <a href="https://themewagon.com" target="_blank" rel="noopener noreferrer">ThemeWagon</a>. Photography: <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a> contributors; <a href="images/IMAGE-SOURCES.txt">image sources and license</a>.</span>' +
		'</div>';
		var $footers = $('footer');

		if (!$footers.length) {
			$footers = $('<footer></footer>').appendTo('#colorlib-page');
		}

		$footers.each(function(index) {
			if (index > 0) {
				$(this).remove();
				return;
			}

			$(this).attr('class', 'bato-site-footer').html('<div class="container">' + footerMarkup + '</div>');
		});

		if (!$('.bato-side-nav').length) {
			var navItems = [
				{href: 'index.html', label: 'Home', icon: 'M3 10.5 12 3l9 7.5M5.5 9v11h13V9M9 20v-7h6v7'},
				{href: 'work.html', label: 'Portfolio', icon: 'M3 4h18v16H3zM3 9h18M9 9v11'},
				{href: 'services.html', label: 'Services', icon: 'M4 19V9l8-5 8 5v10M9 19v-6h6v6'},
				{href: 'blog.html', label: 'Journal', icon: 'M5 3h14v18H5zM8 8h8M8 12h8M8 16h5'},
				{href: 'about.html', label: 'About', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0'},
				{href: 'contact.html', label: 'Contact', icon: 'M3 5h18v14H3zM3 7l9 7 9-7'}
			];
			var currentPage = window.location.pathname.split('/').pop() || 'index.html';
			var navMarkup = '<aside class="bato-side-nav" aria-label="Quick page navigation"><span class="bato-side-nav-title">Explore JOC</span><nav aria-label="Quick links">';

			$.each(navItems, function(index, item) {
				var isActive = currentPage === item.href;
				navMarkup += '<a href="' + item.href + '"' + (isActive ? ' aria-current="page"' : '') + '>' +
					'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + item.icon + '"/></svg>' +
					'<span>' + item.label + '</span></a>';
			});

			navMarkup += '</nav></aside>';
			$('body').append(navMarkup);
		}

		if (!$('.bato-contact-dock').length) {
			$('body').append(
				'<aside class="bato-contact-dock" aria-label="Appointment and message shortcuts">' +
					'<a class="bato-dock-appointment" href="contact.html?inquiry=appointment#project-inquiry" aria-label="Request a photography appointment">' +
						'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 3v3m10-3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Zm3 7h3m-3 4h3"/></svg><span>Appointment</span>' +
					'</a>' +
					'<a class="bato-dock-chat" href="contact.html?inquiry=message#project-inquiry" aria-label="Send JOC a project message">' +
						'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l-2 2v-5.5A7.5 7.5 0 1 1 20 11.5ZM8 11h8m-8 4h5"/></svg><span>Message</span>' +
					'</a>' +
				'</aside>'
			);
		}
	};

	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#colorlib-counter').length > 0 ) {
			$('#colorlib-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Owl Carousel
	var owlCarouselFeatureSlide = function() {
		var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		var owl2 = $('.owl-carousel');
		owl2.owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: !prefersReducedMotion,
		   loop:true,
		   margin:0,
		   nav: true,
		   dots: false,
		   autoHeight: true,
		   mouseDrag: false,
		   autoplayHoverPause: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		});
		var owl3 = $('.owl-carousel3');
		owl3.owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: !prefersReducedMotion,
		   loop:true,
		   margin:0,
		   nav: false,
		   dots: true,
		   autoHeight: true,
		   mouseDrag: false,
		   autoplayHoverPause: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		});	
	};

	var portfolioProjects = [
		{
			title: 'Form in natural light',
			description: 'A study of how daylight moves through a space, shaping its surfaces, scale and atmosphere.',
			image: 'images/architecture-04.jpg',
			category: 'Natural light',
			story: 'A light-led study begins by watching the space change. The viewpoint, timing and balance between brighter and quieter areas are chosen to keep the architecture legible without losing its atmosphere.',
			detail: 'Natural light can describe volume as much as it illuminates a room. Observe where it falls, how it changes the surfaces and which views make the spatial relationships easiest to understand.',
			sequence: {
				wide: 'Begin with a view that makes the overall layout and quality of light easy to read.',
				composition: 'Choose a viewpoint where the light clarifies depth, proportion and the relationship between surfaces.',
				detail: 'Finish with a close view of the material or transition that responds most clearly to the light.'
			},
			supporting: ['images/architecture-07.jpg', 'images/architecture-01.jpg']
		},
		{
			title: 'Material, carefully framed',
			description: 'A closer look at the textures, junctions and finishes that give a project its distinct character.',
			image: 'images/architecture-01.jpg',
			category: 'Materials & detail',
			story: 'Material-led photography rewards a slower pace. Soft reflections, small colour shifts and the meeting of different finishes can all help explain how a space was put together.',
			detail: 'Photographing materials well is about preserving their character. Careful light and restrained colour treatment help texture and tone remain believable alongside the broader room views.',
			sequence: {
				wide: 'Introduce the room or building so the material choices have a clear architectural context.',
				composition: 'Frame the relationship between adjacent finishes, edges and larger surfaces.',
				detail: 'Move closer to the texture, join or crafted transition that gives the material its character.'
			},
			supporting: ['images/architecture-06.jpg', 'images/architecture-07.jpg']
		},
		{
			title: 'Architecture in context',
			description: 'A considered view of a building and its relationship to the surrounding environment.',
			image: 'images/architecture-05.jpg',
			category: 'Architecture & place',
			story: 'A building is never seen in isolation. Context views can explain the route in, its scale against what surrounds it and the way the architecture settles into a particular place.',
			detail: 'A contextual sequence balances the recognizable outline of a building with the details that connect it to its surroundings, without allowing background elements to overwhelm the design.',
			sequence: {
				wide: 'Establish the setting and give the viewer a clear sense of the building’s position.',
				composition: 'Use foreground, approach and architectural lines to guide the viewer toward the design.',
				detail: 'Look for a material, threshold or edge that connects the building to its wider setting.'
			},
			supporting: ['images/architecture-04.jpg', 'images/architecture-09.jpg']
		},
		{
			title: 'The interior perspective',
			description: 'Composed interior views that make room for proportion, use and the quality of light.',
			image: 'images/architecture-07.jpg',
			category: 'Interior spaces',
			story: 'An interior photograph needs to feel inviting and informative at once. Clear sightlines, considered verticals and a view of how the room is used help the space feel connected rather than staged.',
			detail: 'A room becomes easier to understand when the photographs show how its parts relate. Balance openings, furnishings and circulation, then add closer views to describe the atmosphere.',
			sequence: {
				wide: 'Show enough of the room to make its proportions and principal features understandable.',
				composition: 'Choose a view that links the openings, key furniture and route through the interior.',
				detail: 'Add a closer frame that reveals a finish or small design decision within the room.'
			},
			supporting: ['images/architecture-04.jpg', 'images/architecture-01.jpg']
		},
		{
			title: 'Lines and geometry',
			description: 'An exploration of rhythm, structure and the geometry that guides the eye through a place.',
			image: 'images/architecture-09.jpg',
			category: 'Form & geometry',
			story: 'Repeated forms, strong edges and moments of symmetry can give an architectural image a natural rhythm. The camera position is chosen to keep that structure clear and intentional.',
			detail: 'Careful alignment helps the viewer read the architecture rather than the camera correction. A level viewpoint and deliberate use of foreground and background can bring the geometry forward.',
			sequence: {
				wide: 'Reveal the larger structure so the repeated lines and forms have room to breathe.',
				composition: 'Align the viewpoint with the strongest edges and rhythms in the architecture.',
				detail: 'Use a closer crop to isolate a junction, repeated element or shift in geometry.'
			},
			supporting: ['images/architecture-05.jpg', 'images/architecture-06.jpg']
		},
		{
			title: 'Details that define a space',
			description: 'Focused photographs of the craft and small design decisions that complete a larger story.',
			image: 'images/architecture-06.jpg',
			category: 'Craft & detail',
			story: 'Small decisions often carry the feeling of a whole project: a careful material junction, a clean edge or the way light rests on a surface. Detail frames make those decisions visible.',
			detail: 'A close view has more meaning when it connects to a wider story. Pair details with room and context photographs so the viewer understands both the craft and where it belongs.',
			sequence: {
				wide: 'Show the larger setting before moving in close, so the detail has a place in the story.',
				composition: 'Connect the detail to surrounding forms, materials or architectural lines.',
				detail: 'Give the material, junction or crafted edge enough space to read clearly.'
			},
			supporting: ['images/architecture-01.jpg', 'images/architecture-09.jpg']
		}
	];

	var journalNotes = [
		{
			title: 'Finding the right light for a building',
			description: 'A useful starting point is to observe how daylight changes the character of a space before choosing a viewpoint.',
			body: 'Light influences the way we read a building: it can clarify a surface, soften a room or draw attention to a threshold. Before setting up, take time to see how it moves through the space and where its qualities best express the design.',
			image: 'images/architecture-01.jpg',
			category: 'Light & timing',
			readingTime: '4 minute read',
			extra: 'Walk the full space before unpacking. Notice where the light is soft, where it creates a strong edge and how those conditions change the feeling of the room.',
			takeaway: 'Choose the viewpoint and timing that make the design clearest, not simply the brightest moment.',
			supportingImage: 'images/architecture-04.jpg'
		},
		{
			title: 'What makes an interior feel balanced?',
			description: 'Careful framing can show how furniture, openings and architectural lines work together in an interior.',
			body: 'An interior photograph is more than a record of furnishings. The relationship between openings, circulation and architectural lines gives the image its structure. A considered camera position can make those relationships easy to understand while keeping the room inviting.',
			image: 'images/architecture-07.jpg',
			category: 'Interior composition',
			readingTime: '5 minute read',
			extra: 'Look for the route a person’s eye might take through the room. Openings, furniture and architectural lines can work together to lead that movement.',
			takeaway: 'Keep enough context in the frame to explain how the room works, while giving its most important feature a clear role.',
			supportingImage: 'images/architecture-09.jpg'
		},
		{
			title: 'Photographing materials honestly',
			description: 'Texture and colour read best when the lighting and processing respect the qualities of the original materials.',
			body: 'Materials have their own character: the grain of timber, the variation in stone or the quiet reflection of a finished surface. Soft, intentional light and careful colour treatment help these qualities come through without making the photograph feel unlike the space.',
			image: 'images/architecture-01.jpg',
			category: 'Materials & colour',
			readingTime: '4 minute read',
			extra: 'Reflections, mixed light and strong colour casts can quickly change how a finish appears. Check the surface from more than one angle and make small, consistent adjustments.',
			takeaway: 'Aim for a believable rendering of the actual material, rather than a dramatic edit that changes its character.',
			supportingImage: 'images/architecture-06.jpg'
		},
		{
			title: 'A wider view of architectural context',
			description: 'The surroundings can be as important as the building itself when explaining how a project belongs to its place.',
			body: 'A building is part of a larger setting. A wider view can communicate how people approach it, how it meets the landscape or street, and how its scale relates to what is around it. Context turns a standalone image into a more complete account of the project.',
			image: 'images/architecture-05.jpg',
			category: 'Place & context',
			readingTime: '4 minute read',
			extra: 'Consider the approach, the neighboring forms and the wider landscape. A thoughtful contextual frame can help the viewer understand why the building belongs where it is.',
			takeaway: 'Use context to explain the project’s relationship to its setting, not as background decoration.',
			supportingImage: 'images/architecture-04.jpg'
		},
		{
			title: 'Working with lines and perspective',
			description: 'A deliberate camera position helps keep verticals composed and makes the structure easier to read.',
			body: 'Perspective is a design decision in every frame. Taking time to choose a level camera position and a clear relationship between foreground and background helps the architecture read naturally. The result feels composed rather than corrected after the fact.',
			image: 'images/architecture-06.jpg',
			category: 'Perspective',
			readingTime: '5 minute read',
			extra: 'Take a moment to check the camera level and the strongest verticals before settling on a composition. Small changes in position can simplify a complicated frame.',
			takeaway: 'A deliberate camera position usually produces a more natural architectural image than a heavy correction later.',
			supportingImage: 'images/architecture-09.jpg'
		},
		{
			title: 'The small details in a larger story',
			description: 'Finishes, edges and transitions often reveal the thought behind a project and complement the wider views.',
			body: 'Close photographs bring attention to the details that can be missed in a broad view: how two materials meet, how a handrail turns or how light catches a finish. Used alongside establishing images, these details make a project story richer and more complete.',
			image: 'images/architecture-07.jpg',
			category: 'Craft & detail',
			readingTime: '3 minute read',
			extra: 'Look for a detail that carries meaning: the way two finishes meet, a repeated edge or the mark of careful making. Keep enough surrounding information to show where it belongs.',
			takeaway: 'Pair close details with wider views so craft feels connected to the whole project.',
			supportingImage: 'images/architecture-01.jpg'
		},
		{
			title: 'Preparing a space for photography',
			description: 'A shared shot list and a little time for final adjustments help the photography stay focused on the design.',
			body: 'Preparation is a collaboration. A short conversation about the intended audience, a simple shot list and time for final checks can make the session more focused. It also leaves room to respond to the qualities of the space on the day.',
			image: 'images/architecture-04.jpg',
			category: 'Shoot preparation',
			readingTime: '4 minute read',
			extra: 'A quick walkthrough, a shared list of priorities and time for final adjustments can reduce interruptions and make the most of changing daylight.',
			takeaway: 'Preparation should create a clear starting point while leaving room to respond to the actual space.',
			supportingImage: 'images/architecture-07.jpg'
		},
		{
			title: 'Building a useful image set',
			description: 'A coherent set balances establishing views with closer photographs, giving each image a clear purpose.',
			body: 'A useful image set offers more than one scale of view. Establishing photographs explain the overall space, while closer frames show material, detail and atmosphere. Planning both together creates a sequence that can serve a project across different formats.',
			image: 'images/architecture-09.jpg',
			category: 'Image planning',
			readingTime: '4 minute read',
			extra: 'Before the shoot, consider where each image may appear and what it needs to communicate. A useful list gives the shoot structure without forcing every frame into a rigid plan.',
			takeaway: 'Plan across scales: establishing views, composed room photographs and close details each serve a different purpose.',
			supportingImage: 'images/architecture-05.jpg'
		},
		{
			title: 'From brief to final selection',
			description: 'Agreeing on audience and intended use early makes it easier to select images that serve the project well.',
			body: 'The intended use of photographs helps shape the brief, the shoot and the final edit. When everyone understands who the images are for and where they will appear, selecting a consistent, purposeful collection becomes much more straightforward.',
			image: 'images/architecture-05.jpg',
			category: 'Brief & selection',
			readingTime: '4 minute read',
			extra: 'Audience, format and intended use all affect how an image set should be prepared. Agreeing on these early makes the final selection easier to evaluate.',
			takeaway: 'Define success before the shoot so the final photographs answer a real project need.',
			supportingImage: 'images/architecture-04.jpg'
		}
	];

	var setLocalImage = function(selector, source, alt) {
		var height = source === 'images/architecture-01.jpg' ? 1088 : 1067;
		$(selector).attr({
			src: source,
			alt: alt,
			width: 1600,
			height: height
		});
	};

	var setPortfolioContent = function() {
		$('.work-entry-flex').each(function(index) {
			var project = portfolioProjects[index];
			if (!project) {
				return;
			}

			var projectUrl = 'work-single.html?project=' + (index + 1);
			$(this).find('.text-inner h2 a').text(project.title).attr('href', projectUrl);
			$(this).find('.text-inner > p').first().text(project.description);
			$(this).find('.text-inner .btn-view').attr('href', projectUrl);
			$(this).addClass('bato-project-card');
			var $text = $(this).find('.text-inner');
			$text.find('.bato-project-category').remove();
			$('<span class="bato-project-category"></span>').text(project.category + ' / Image study').insertBefore($text.find('h2').first());
			$text.find('.bato-project-focus').remove();
			$('<p class="bato-project-focus"></p>').text(project.detail).insertAfter($text.find('> p').first());
		});

		var projectIndex = parseInt(new URLSearchParams(window.location.search).get('project'), 10) - 1;
		var selectedProject = portfolioProjects[projectIndex];
		if (selectedProject && $('[data-project-title]').length) {
			$('[data-project-title]').text(selectedProject.title);
			$('[data-project-description]').text(selectedProject.description);
			$('[data-project-category]').text(selectedProject.category + ' / Image study');
			$('[data-project-story]').text(selectedProject.story);
			$('[data-project-detail]').text(selectedProject.detail);
			$('[data-project-sequence="wide"]').text(selectedProject.sequence.wide);
			$('[data-project-sequence="composition"]').text(selectedProject.sequence.composition);
			$('[data-project-sequence="detail"]').text(selectedProject.sequence.detail);
			$('.work-single-flex .work-img').css('background-image', 'url(' + selectedProject.image + ')').attr('aria-label', selectedProject.title);
			setLocalImage('[data-project-image="wide"]', selectedProject.image, selectedProject.title + ': establishing view');
			setLocalImage('[data-project-image="composition"]', selectedProject.supporting[0], selectedProject.title + ': composed architectural view');
			setLocalImage('[data-project-image="detail"]', selectedProject.supporting[1], selectedProject.title + ': material and detail view');
			document.title = selectedProject.title + ' | JOC Architectural Photography';
			$('meta[name="description"]').attr('content', selectedProject.description);
		}
	};

	var setJournalContent = function() {
		$('.article').each(function(index) {
			var note = journalNotes[index];
			if (!note) {
				return;
			}

			var noteUrl = 'blog-single.html?note=' + (index + 1);
			$(this).find('.blog-img, .desc h2 a').attr('href', noteUrl);
			$(this).find('.desc h2 a').text(note.title);
			$(this).find('.desc > p').text(note.description);
			$(this).find('.desc .meta').text(note.category + ' / ' + note.readingTime);
			$(this).find('.blog-img img').attr('alt', note.title);
		});

		var noteIndex = parseInt(new URLSearchParams(window.location.search).get('note'), 10) - 1;
		var selectedNote = journalNotes[noteIndex];
		if (selectedNote && $('[data-note-title]').length) {
			$('.work-desc .title').text(selectedNote.category);
			$('[data-note-title]').text(selectedNote.title);
			$('[data-note-description]').text(selectedNote.description);
			$('[data-note-body]').text(selectedNote.body);
			$('[data-note-extra]').text(selectedNote.extra);
			$('[data-note-takeaway]').text(selectedNote.takeaway);
			$('[data-note-reading-time]').text(selectedNote.readingTime);
			setLocalImage('[data-note-support-image]', selectedNote.supportingImage, selectedNote.title + ': architectural detail');
			$('.work-single-flex .work-img').css('background-image', 'url(' + selectedNote.image + ')');
			document.title = selectedNote.title + ' | JOC Journal';
			$('meta[name="description"]').attr('content', selectedNote.description);
		}
	};

	var demoContactForm = function() {
		var requestType = new URLSearchParams(window.location.search).get('inquiry');
		if (requestType === 'appointment') {
			$('#inquiry-type').val('appointment');
		} else if (requestType === 'message') {
			$('#inquiry-type').val('message');
		}

		$('#project-inquiry').on('submit', function(event) {
			event.preventDefault();
			if (!this.checkValidity()) {
				this.reportValidity();
				return;
			}

			$('#contact-form-status').text('Demo only: the form validated. No message was sent or stored.');
		});
	};

	

	// Document on load.
	$(function(){
		fullHeight();
		burgerMenu();
		siteSearch();
		siteChrome();
		// counterWayPoint();
		contentWayPoint();
		owlCarouselFeatureSlide();
		setPortfolioContent();
		setJournalContent();
		demoContactForm();
	});


}());