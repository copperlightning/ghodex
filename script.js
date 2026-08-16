/*
    Ghodex: A Phasmophobia Fanmade Journal App
    Ver 5.0.0
    by copperlightning
    script.js
*/

// uses jQuery!

"use strict"; 

// INITIALIZE VARIABLES
var click_count = 0; // buttons selected
var selection = []; // evidence clicked
var pos; // var for deletion position
var results = 0; // no. of ghosts shown
var time = 100; // fade animation time
var lastUpdated = "Aug 16, 2026"; // display date

// GET ELEMENTS
var wrapper = document.getElementById("wrapper");

// EVIDENCE LIST
var evidence = [
                    "EMF Level 5", // 0
                    "Ghost Orb", // 1
                    "Ghost Writing", // 2                            
                    "Fingerprints", // 3
                    "Spirit Box", // 4
                    "Freezing Temps", // 5
                    "D.O.T.S. Projector" // 6
                ];

// DEFINE GHOST OBJECTS (descriptions from the phasmophobia wiki)
var aswang = {
    id: "#aswang",
    name: "Aswang",
    evidence: [evidence[2], evidence[5], evidence[6]],
    strength: "Will accelerate faster with line-of-sight than any other ghost. Can sometimes hunt with zero grace period.",
    weakness: "Cannot kill players in official hiding spots. Slower hunt base speed.",
    matches: 0
}

var banshee = {
    id: "#banshee",
    name: "Banshee",
    evidence: [evidence[1], evidence[3], evidence[6]],
    strength: "Will target a chosen player, assuming said player is inside. Increased chance of performing a singing ghost event.",
    weakness: "Has several distinctive wails on the Parabolic Microphone and the Sound Recorder.",
    matches: 0
}

var dayan = {
    id: "#dayan",
    name: "Dayan",
    evidence: [evidence[0], evidence[1], evidence[4]],
    strength: "Moves faster during hunts and hunts sooner when a player moves near the Dayan.",
    weakness: "Moves slower during hunts and hunts later when a player stands still near the Dayan.",
    matches: 0
}

var deildegast = {
    id: "#deildegast",
    name: "Deildegast",
    evidence: [evidence[0], evidence[2], evidence[6]],
    strength: "Moves significantly faster at the start of the contract.",
    weakness: "Becomes slower when on-site props are moved.",
    matches: 0
}

var demon = {
  id: "#demon",
  name: "Demon",
  evidence: [evidence[2], evidence[3], evidence[5]],
    strength: "Incense is less effective, preventing a hunt for less time. Can rarely initiate a hunt at any sanity level.",
    weakness: "Crucifix range is 50% larger than placement range indicator.",
  matches: 0
}

var deogen = {
    id: "#deogen",
    name: "Deogen",
    evidence: [evidence[2], evidence[4], evidence[6]],
    strength: "Always knows where the player is during a hunt and moves very quickly toward its victim.",
    weakness: "Moves extremely slowly once near its victim.",
    matches: 0
}

var gallu = {
    id: "#gallu",
    name: "Gallu",
    evidence: [evidence[0], evidence[3], evidence[4]],
    strength: "Becomes aggressive when protective equipment is used.",
    weakness: "Becomes less aggressive after a hunt.",
    matches: 0
}

var goryo = {
    id: "#goryo",
    name: "Goryo",
    evidence: [evidence[0], evidence[3], evidence[6]],
    strength: "Can only enter a D.O.T.S. state when no player is in the same room. Its D.O.T.S.silhouette can only be seen through a Video Camera.",
    weakness: "Cannot wander far from its room, or change favorite rooms.",
    matches: 0
}

var hantu = {
    id: "#hantu",
    name: "Hantu",
    evidence: [evidence[1], evidence[3], evidence[5]],
    strength: "Lower temperatures allow the Hantu to move faster during hunts.",
    weakness: "Warmer areas slow the Hantu's movement while hunting. Will produce freezing breath during a hunt if the fuse box is off. Will never turn the fuse box on.",
    matches: 0
}

var jinn = {
    id: "#jinn",
    name: "Jinn",
    evidence: [evidence[0], evidence[3], evidence[5]],
    strength: "Travels at a faster speed if a distant player is in line of sight while the fuse box is on. Can occasionally drain large amounts of sanity from a nearby player.",
    weakness: "Cannot use its ability if the fuse box is off. Will never turn the fuse box off directly.",
    matches: 0
}

var kormos = {
    id: "#kormos",
    name: "Kormos",
    evidence: [evidence[1], evidence[3], evidence[4]],
    strength: "Can detect a player's footsteps from far away during a hunt and hunts earlier if players sprint nearby.",
    weakness: "Can nearly not detect the player visually.",
    matches: 0
}

var mare = {
    id: "#mare",
    name: "Mare",
    evidence: [evidence[2], evidence[4], evidence[6]],
    strength: "Can hunt at a higher sanity in the dark.",
    weakness: "Has a lower hunt sanity threshold in the light. Will occasionally turn lights off immediately after a player has turned them on. Will never turn a light on.",
    matches: 0
}

var moroi = {
    id: "#moroi",
    name: "Moroi",
    evidence: [evidence[2], evidence[4], evidence[5]],
    strength: "Moves noticeably faster at low average sanity. Can curse players, making them lose sanity quicker than usual while in the investigation zone.",
    weakness: "Incense blinds the ghost for 50% longer during hunts.",
    matches: 0
}

var myling = {
    id: "#myling",
    name: "Myling",
    evidence: [evidence[0], evidence[2], evidence[3]],
    strength: "Only becomes audible during a hunt at a closer range than other ghosts.",
    weakness: "Produces paranormal sounds more frequently on the Parabolic Microphone.",
    matches: 0
}

var obake = {
    id: "#obake",
    name: "Obake",
    evidence: [evidence[0], evidence[1], evidence[3]],
    strength: "Has a chance to not leave fingerprints when interacting with things. May cause existing fingerprints to disappear sooner than usual.",
    weakness: "Has a small chance of leaving special fingerprints. Can briefly shapeshift into another model during a hunt.",
    matches: 0
}

var obambo = {
    id: "#obambo",
    name: "Obambo",
    evidence: [evidence[2], evidence[3], evidence[6]],
    strength: "Hunts earlier and moves faster in its \"aggressive\" state.",
    weakness: "Hunts later and moves slower in its \"calm\" state. Hunts initiated in its \"aggressive\" state have a reduced duration.",
    matches: 0
}

var oni = {
    id: "#oni",
    name: "Oni",
    evidence: [evidence[0], evidence[5], evidence[6]],
    strength: "Increased activity when players are nearby.",
    weakness: "More visible during hunts. Cannot perform the \"airball\" ghost event.",
    matches: 0
}

var onryo = {
    id: "#onryo",
    name: "Onryo",
    evidence: [evidence[1], evidence[4], evidence[5]],
    strength: "Will attempt to hunt after it has extinguished three flames regardless of average sanity.",
    weakness: "A nearby lit flame will prevent the Onryo from hunting, just like a crucifix.",
    matches: 0
}

var phantom = {
    id: "#phantom",
    name: "Phantom",
    evidence: [evidence[2], evidence[3], evidence[6]],
    strength: "Looking at a Phantom and hearing heartbeat sounds will drain the player's sanity. Will occasionally walk to a random player.",
    weakness: "Taking a photo of the Phantom will cause it to disappear. Less visible during hunts.",
    matches: 0
}

var poltergeist = {
    id: "#poltergeist",
    name: "Poltergeist",
    evidence: [evidence[2], evidence[3], evidence[4]],
    strength: "Capable of throwing multiple objects at once, draining sanity. Can throw objects at high velocities.",
    weakness: "Becomes powerless with no throwables nearby.",
    matches: 0
}

var raiju = {
    id: "#raiju",
    name: "Raiju",
    evidence: [evidence[0], evidence[1], evidence[5]],
    strength: "Moves faster near active electronic equipment.",
    weakness: "Disrupts electronic equipment from further away when it hunts.",
    matches: 0
}

var revenant = {
  id: "#revenant",
  name: "Revenant",
    evidence: [evidence[1], evidence[2], evidence[5]],
    strength: "Moves significantly faster when a player is detected during a hunt.",
    weakness: "Moves very slowly when not detecting a player.",
  matches: 0
}

var shade = {
    id: "#shade",
    name: "Shade",
    evidence: [evidence[0], evidence[2], evidence[5]],
    strength: "Less likely to perform interactions.",
    weakness: "Cannot hunt if people are nearby.",
    matches: 0
}

var spirit = {
    id: "#spirit",
    name: "Spirit",
    evidence: [evidence[0], evidence[2], evidence[4]],
    strength: "No strength.",
    weakness: "Incense is more effective, preventing a hunt for longer.",
    matches: 0
}

var thaye = {
    id: "#thaye",
    name: "Thaye",
    evidence: [evidence[1], evidence[2], evidence[6]],
    strength: "Moves faster during a hunt and much more active in general at the beginning of a contract.",
    weakness: "Becomes slower and less active over time when players are nearby.",
    matches: 0
}

var themimic = {
    id: "#themimic",
    name: "The Mimic",
    evidence: [evidence[2], evidence[3], evidence[5]],
    strength: "Can mimic the abilities and traits of other ghosts.",
    weakness: "Will present fake Ghost Orbs as secondary evidence.",
    matches: 0
}

var thetwins = {
    id: "#thetwins",
    name: "The Twins",
    evidence: [evidence[0], evidence[4], evidence[5]],
    strength: "Either twin may start a hunt, though not at the same time. One twin is slow, the other is fast.",
    weakness: "Will often interact with the environment at the same time but usually in different places.",
    matches: 0
}

var wraith = {
    id: "#wraith",
    name: "Wraith",
    evidence: [evidence[0], evidence[4], evidence[6]],
    strength: "Cannot be tracked by footsteps. Will occasionally teleport to a random player.",
    weakness: "Will not step in salt.",
    matches: 0
}

var yokai = {
    id: "#yokai",
    name: "Yokai",
    evidence: [evidence[1], evidence[4], evidence[6]],
    strength: "Talking in the same room as a Yokai temporarily allows it to hunt at a much higher sanity threshold than usual.",
    weakness: "Can only hear players within a short radius during a hunt.",
    matches: 0
}

var yurei = {
  id: "#yurei",
  name: "Yurei",
    evidence: [evidence[1], evidence[5], evidence[6]],
    strength: "Can quickly drain sanity from nearby players.",
    weakness: "Smudging the Yurei will temporarily trap it and reduce how often it wanders. Using its ability causes it to slam doors.",
  matches: 0
}

// create array of ghosts!
var ghosts = [
                aswang,
                banshee,
                dayan,
                deildegast,
                demon,
                deogen,
                gallu,
                goryo,
                hantu,
                jinn,
                kormos,
                mare,
                moroi,
                myling,
                obake,
                obambo,
                oni,
                onryo,
                phantom,
                poltergeist,
                raiju,
                revenant,
                shade,
                spirit,
                thaye,
                themimic,
                thetwins,
                wraith,
                yokai,
                yurei
            ];


// DEFINE FUNCTIONS

// enable/disable evidence buttons based on whether a ghost can be matched w/ it
function enableButtons() {
    // for each evidence button
    $(".button").each(function() {
        // remove "available" class from button
        $(this).removeClass("available");
        var btn = $(this); // save reference to button (to add class)
        var btnText = $(this).find("p").text(); // save evidence text of button
        var match = 0;
        // for each ghost shown in results list, find evidence that matches
        // only go through ghosts that have display: flex! (shown ghosts)
        $(".ghost").each(function() {
            var display = $(this).css("display"); // get display state (works)
            if (display == "flex") {
                // iterate through evidence of shown ghost and find match!
                $(this).find(".evidence").each(function() {
                     if ($(this).text() == btnText) { // if match found
                         $(btn).addClass("available"); // make button available
                         // break evidence and ghost loops, go to next button
                         match++;
                         return; // break out of the evidence forEach loop
                     }
                });
            }   
            if (match) return; // break ghost forEach loop and go to next button
        });
        // animate button availability transitions
        if ($(this).hasClass("available")) {
            $(this).animate({ opacity: 1 }, time);
        } else {
            $(this).animate({ opacity: 0.25 }, time);
        }
    });
}

// show which ghosts are relevant to the selected evidence
// runs every time you click an evidence button
function search() {   
  // first, hide all ghosts, placeholder text, and descriptions
  $(".ghost").hide();
  $("#placeholder").hide();
    $(".description").hide();
    $("#attributions").hide();
  
  // remove crossed class for all evidence pieces
  $(".evidence").removeClass("crossed");
    
    // remove circled class for all ghost names
    $(".name").removeClass("circled");
   
  // reset results count
  results = 0;

    // cross off evidence for each ghost div if a piece matches selected evidence
  // for each ghost
  for (var i = 0; i < ghosts.length; i++) {
    // for each symptom in ghost
    for (var j = 0; j < 3; j++) {
      // iterate through evidence buttons
      for (var k = 0; k < selection.length; k++) {
        // does evidence match ghost's symptom?
        if (ghosts[i].evidence[j] == selection[k]) {
          // if yes, add a match to ghost
          ghosts[i].matches++;
          // do all ghost symptoms match evidence?
          if (selection.length == ghosts[i].matches) {
            // if yes, make that ghost a match
            $(ghosts[i].id).fadeIn(time); // ???? why fade in
            
            // cross off that evidence in list (pass ghost obj in)
            cross_off(ghosts[i]);
            
            // add to result count
            results++;
          }
        }
      } 
    }
  }
    
  // once done iterating through ghosts:
  
  // show number of ghost matches 
  $("#results span").text(results);
  
  // if no ghosts matched and no button clicked, show all ghosts
  if ((results < 1) && (click_count < 1)) {
    $(".ghost").show();
    $("#results span").text(ghosts.length);
  } else if (results < 1) {
    // if no ghosts, but at least one button clicked, show placeholder only
    $("#placeholder").fadeIn(time);
      $(".description").show();
      wrapper.scroll(0, 9999); // scroll to bottom
  } 
    
    // if only one ghost is shown in results, circle that specific ghost's name,
    // auto-expand its description, and scroll down to it
    if (results == 1) {
        for (var i = 0; i < ghosts.length; i++) {
            if (ghosts[i].matches >= 2) {
                // circle name
                $(ghosts[i].id).find(".name").addClass("circled");

                // expand info
                $(ghosts[i].id).find(".description").show();
            }
        } 
    }
    
    // gray out unused evidence buttons!
    enableButtons();
    
    // reset matched amounts
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].matches = 0;
  } 
}

// this function runs through and shows every ghost that qualifies
// also clears its matches var
function show_ghost() {
  for (var i = 0; i < ghosts.length; i++) {
    if (ghosts[i].show = true) {
      $(ghosts[i].id).fadeIn(time); // show ghost
    } // clear matches
    ghosts[i].matches = 0;
  } 
}

// this function crosses off evidence if a ghost found!
// passes in index of current ghost
function cross_off(ghost) {
  // iterate through current ghosts's evidence (again)
  for (var m = 0; m < 3; m++) {
    // iterate through selected evidence
    for (var n = 0; n < selection.length; n++) {
      // if they match
      if (ghost.evidence[m] == selection[n]) {
        // look for corresponding evidence in DOM
        $(ghost.id).find(".evidence").each(function(index) {
          if ($(this).text() == selection[n]) { // if found
            $(this).addClass("crossed"); // cross it off!
          }
        });
      }
    }
  }
}

// hide ghost list and perform search, then show again
function transitionAnim() {
    /* TODO: This is where I want enableButtons() to fire */
    
    $("#ghostlist").fadeOut(time, search).fadeIn(function() {
        if ($("#results").find("span").text() == "1") {
            wrapper.scroll(0, 9999); // scroll to bottom if only one ghost
        }
    }); 
}

// if scrolled down and btnScroll not already displayed, show it
function showScrollBtn() {
    var style = getComputedStyle(document.getElementById("btnScroll"));
    if (wrapper.scrollTop >= 200) {
        if (style.display == "none") {
            $("#btnScroll").fadeIn(time);
        }
    } else if (style.display != "none") {
        $("#btnScroll").fadeOut(time);
    } 
}

// expand description of selected ghost (event called on "name")
function expandDesc(event) {
    // if description is not expanded, expand and scroll page to it
    // else if description is already open, simply close it
    var display = $(this).parent().children(".description").css("display");
    if (display == "none") {
        $(this).parent().children(".description").slideDown(function() {
            // centers the top of the "description" element on screen
            var scrollTarget = event.target.parentElement.children[4];
            scrollTarget.scrollIntoView({block: "center"});
        })
    } else {
        if ($(this).parent().attr("id") != "placeholder") { // don't allow placeholder desc to be minimized
            $(this).parent().children(".description").slideUp();
        }
    }
}

// MAIN FUNCTION
// runs when window is done loading!
$( document ).ready(function() {

    // make all buttons available at start (unavailable ones are not clickable)
    $(".button").each(function() {
        $(this).addClass("available");
    });
    
    // SET EVENT LISTENERS
    // scroll to top button function
    $("#btnScroll").click(function() { 
        wrapper.scrollTo(0,0); 
    });
    
    // show Scroll To Top button when element is scrolled down far enough
    // window.addEventListener("scroll", showScrollBtn);
    wrapper.addEventListener("scroll", showScrollBtn);
    
    // show/hide attributions (commented out bc want to always show)
    $(".attClick").click(function() {        
        $("#attributions").slideToggle(function() {
            // force scroll to go all the way to the bottom lol
            wrapper.scroll(0, 9999); 
        });
    })
    
  // auto-fill out fields
  for (var i = 0; i < ghosts.length; i++) {
      
      // fill ghost names
      $("#display")    
        .find(ghosts[i].id)
        .find(".name")
        .text(ghosts[i].name);

      // fill evidence lists
      $("#display")
        .find(ghosts[i].id)
        .find(".evidence1")
        .text(ghosts[i].evidence[0]);
      $("#display")
        .find(ghosts[i].id)
        .find(".evidence2")
        .text(ghosts[i].evidence[1]);
      $("#display")
        .find(ghosts[i].id)
        .find(".evidence3")
        .text(ghosts[i].evidence[2]);

        // fill ghost descriptions
        $("#display")    
        .find(ghosts[i].id)
        .find(".description .strength")
        .text(ghosts[i].strength);
      
      // fill ghost descriptions
        $("#display")    
        .find(ghosts[i].id)
        .find(".description .weakness")
        .text(ghosts[i].weakness);
  }

  // set default results
  $("#results span").text(ghosts.length);

  // set last updated value
  $("#lastUpdated").text("Last updated: " + lastUpdated);
  
  // set listener for hide/show description (anonymous)
  $( ".name" ).click(expandDesc);
  
  // set button click listener for evidence search function! (anonymous)
    $( ".button" ).click(function( event ) {
        if ($(this).hasClass("available")) { // button must be enabled
            // TOGGLE BUTTON!
            // TURN OFF (if button is on)
            if ($(this).hasClass("clicked")) {
              click_count--; // remove button from count
              $(this).removeClass("clicked");

                // hide cross-off image of button (un-cross image)
                $(this).find("img").animate({
                    opacity: 0
                }, time);

              // remove evidence from selection
              pos = selection.indexOf($(this).find("p").text());
              selection.splice(pos,1);

              //show relevant (animated)
                transitionAnim();

              // TURN ON (if less than 3 buttons already clicked)
            } else if (click_count < 3) {
            $(this).addClass("clicked");
              click_count++; // add

                // show cross-off image of button
                $(this).find("img").animate({
                    opacity: 1
                }, time);

              // add evidence to selection
              selection.push($(this).find("p").text());

                // show relevant (animated)
                transitionAnim();
            }
        }
   });
});

/* 
    TODO: enableButtons() is too slow and enables weird/simultaneous input on mobile.
    Need to find a way to get it to activate simultaneously with crossoff/before search.
*/