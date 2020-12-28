import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  componentDidMount
} from "react";
import "./slide-menu.js";
import "./demo.css";
import "./slide-menu.css";
import "./style.css";
import ReactDOM from "react-dom";
import $ from "jquery";

export default function ReducerExample() {
  var menu;
  var header = useRef("");
  var sidebar = useRef("");
  var sidebar2 = useRef("");
  var more_sub_links = useRef("");
  var about_sub_links = useRef("");
  var more_media_sub_links = useRef("");
  var more_event_sub_links = useRef("");
  var mobileSideNav = useRef("");
  var about_innovation_sub_links = useRef("");
  var about_services_sub_links = useRef("");
  var currentLink;
  var currentSubLink;
  // var [currentLink, setCurrentLink] = useState();
  console.log(sidebar, sidebar2, more_sub_links, about_sub_links);

  useEffect(() => {
    const menuElement = mobileSideNav.current;
    console.log(menuElement);
    menu = new SlideMenu(menuElement, {
      keyClose: "Escape",
      submenuLinkAfter:
        '<span style="margin-left: 1em; font-size: 85%;">⮞</span>',
      backLinkBefore:
        '<span style="margin-right: 1em; font-size: 85%;">⮜</span>'
    });
    menuElement.addEventListener("sm.open", function() {
      console.log("The menu opens");
    });

    menuElement.addEventListener("sm.open-after", function() {
      console.log("The menu has opened");
    });
  }, []);

  function showMenu() {
    console.log("menu loaded");
    window.document.body.style.overflowY = "hidden";
    mobileSideNav.current.classList.remove("close-menu");
    mobileSideNav.current.classList.add("open-menu");
    menu.open();

    // Attach the event listener to the *DOM element*, not the SlideMenu instance
  }
  function closeMenu() {
    mobileSideNav.current.classList.remove("open-menu");
    mobileSideNav.current.classList.add("close-menu");
    window.document.body.style.overflowY = "scroll";
  }

  function headerMouseOver() {
    header.current.classList.add("scrollHeader");
  }
  function headerMouseLeave() {
    if (sidebar.current.hidden == true)
      header.current.classList.remove("scrollHeader");
  }

  function handleMouseOver(event) {
    if (currentLink != undefined && currentLink.classList.contains("active")) {
      currentLink.classList.remove("active");
    }

    console.log("mouse", event.target);
    currentLink = event.target;
    currentLink.classList.add("active");

    console.log("link event", event.target.innerHTML.toLowerCase().trim());
    if (event.target.innerHTML.includes("About")) {
      console.log("inside about ua");

      more_sub_links.current.hidden = true;
      about_sub_links.current.hidden = false;
    } else if (event.target.innerHTML.includes("More")) {
      more_sub_links.current.hidden = false;
      about_sub_links.current.hidden = true;
    } else {
      sidebar.current.hidden = true;
      sidebar2.current.hidden = true;
      return;
    }
    sidebar.current.hidden = false;
    sidebar.current.focus = true;

    window.document.body.style.overflowY = "hidden";

    if (sidebar2.current.hidden == false) {
      sidebar2.current.hidden = true;
    }
    //sidebar.current.style.left = 0 + "px";
  }
  function handleSidebarMouseLeave() {
    if (sidebar2.current.hidden == true) {
      sidebar.current.hidden = true;
      sidebar.current.focus = false;
      header.current.classList.remove("scrollHeader");
      window.document.body.style.overflowY = "scroll";
      if (currentLink != undefined) {
        currentLink.classList.remove("active");
      }
      if (currentSubLink != undefined) {
        currentSubLink.classList.remove("active");
      }

      // currentLink.classList.remove('active')
    }
  }
  function handleSidebar2MouseLeave() {
    sidebar2.current.hidden = true;
    sidebar.current.focus = true;
  }
  function handleMoreMouseLeave(event) {}
  function handleMoreMouseOver(event) {
    if (
      currentSubLink != undefined &&
      currentSubLink.classList.contains("active")
    ) {
      currentSubLink.classList.remove("active");
    }

    console.log("mouse", event.target);
    currentSubLink = event.target;
    currentSubLink.classList.add("active");
    console.log("link event", event.target.innerHTML);

    if (event.target.innerHTML.includes("Media")) {
      console.log("inside media");
      more_media_sub_links.current.hidden = false;
      more_event_sub_links.current.hidden = true;
      about_innovation_sub_links.current.hidden = true;
      about_services_sub_links.current.hidden = true;
    } else if (event.target.innerHTML.includes("Events")) {
      console.log("inside events");
      more_media_sub_links.current.hidden = true;
      about_innovation_sub_links.current.hidden = true;
      about_services_sub_links.current.hidden = true;
      more_event_sub_links.current.hidden = false;
    } else if (event.target.innerHTML.includes("Innovations")) {
      console.log("inside events");
      more_media_sub_links.current.hidden = true;
      more_event_sub_links.current.hidden = true;
      about_innovation_sub_links.current.hidden = false;
      about_services_sub_links.current.hidden = true;
    } else if (event.target.innerHTML.includes("Services")) {
      console.log("inside events");
      more_media_sub_links.current.hidden = true;
      more_event_sub_links.current.hidden = true;
      about_innovation_sub_links.current.hidden = true;
      about_services_sub_links.current.hidden = false;
    } else {
      sidebar2.current.hidden = true;
      return;
    }

    sidebar2.current.focus = true;
    //document.body.style.overflowY = "hidden";
    sidebar2.current.hidden = false;
    //  sidebar.style.left = 400 + "px";
  }

  return (
    <div className="container-fluid" style={{ height: "1200px" }}>
      <header
        id="header"
        className="header row"
        ref={header}
        onMouseLeave={headerMouseLeave}
        onMouseOver={headerMouseOver}
      >
        <div
          style={{ cursor: "pointer" }}
          className="d-lg-none col-sm-2"
          id="menuBtn"
          onClick={showMenu}
        >
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar3" />
        </div>

        <nav id="nav" className="nav col-sm-5 ">
          <a className="nav-link" href="#" onMouseOver={handleMouseOver}>
            About Us
          </a>
          <a className="nav-link" href="#" onMouseOver={handleMouseOver}>
            Masterclass
          </a>
          <a className="nav-link" href="#" onMouseOver={handleMouseOver}>
            Eco Store
          </a>
          <a className="nav-link " href="#" onMouseOver={handleMouseOver}>
            More
          </a>
        </nav>
        <div className="col-sm-3">
          <a className="navbar-brand" href="#" />
        </div>
        <div id="headerBtn" className="col-sm-4">
          <button className="btn btnSubscribe">SUBSCRIBE</button>
          <button className="btn btnSign">Sign In</button>
        </div>
      </header>
      <div
        id="sidebar"
        ref={sidebar}
        onMouseLeave={handleSidebarMouseLeave}
        hidden
      >
        <div className="sidenav ">
          <div id="more_sub_links" ref={more_sub_links} hidden>
            <a
              href="#services"
              className="link1"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Media
              <i className="arrow right" />
            </a>
            <a
              href="#clients"
              className="link1"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Invite us at your event
            </a>

            <a
              href="#services"
              className="link1"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              'green' Opportunities
            </a>
            <a
              href="#clients"
              className="link1"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Events
              <i className="arrow right" />
            </a>
            <a
              href="#services"
              className="link1"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Blog
            </a>
            <a
              href="#clients"
              className="link1"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Forum
            </a>

            <a
              href="#services"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Circulars
            </a>
            <a
              href="#clients"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Contact Us
            </a>
            <a
              href="#services"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Join our group for whatsapp
            </a>
            <a
              href="#clients"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Support us on social media
            </a>
          </div>
          <div id="about_sub_links" ref={about_sub_links} hidden>
            <a
              href="#services"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Our 'green' Story
            </a>
            <a
              href="#clients"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Our 'green' Journey
            </a>

            <a
              href="#services"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Innovations
              <i className="arrow right" />
            </a>
            <a
              href="#clients"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Our Services <i className="arrow right" />
            </a>
            <a
              href="#services"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Team and Think Tank
            </a>
            <a
              href="#clients"
              onMouseOver={handleMoreMouseOver}
              onMouseLeave={handleMoreMouseLeave}
            >
              Our Clients
            </a>
          </div>
        </div>
      </div>
      <div
        id="sidebar2"
        ref={sidebar2}
        onMouseLeave={handleSidebar2MouseLeave}
        hidden
      >
        <div className="sidenav2">
          <div id="more_media" ref={more_media_sub_links} hidden>
            <a href="#services">Websites</a>

            <a href="#services">Websites</a>
            <a href="#services">See Overview</a>
          </div>
          <div id="link1" ref={more_event_sub_links} hidden>
            <a href="#services">Online Events</a>

            <a href="#services">Offline Events</a>
          </div>
          <div id="link1" ref={about_innovation_sub_links} hidden>
            <a href="#services">Organic Waste to Biofulel</a>
            <a href="#services">Plastic Waste to Biofulel</a>

            <a href="#services">Medical Mobile Clinic</a>
            <a href="#services">Polluted Air to Clean Air</a>
            <a href="#services">Electric Transportation</a>
          </div>
          <div id="link1" ref={about_services_sub_links} hidden>
            <a href="#services">Turnkey bio-refinery Project</a>
            <a href="#services">Consultancy</a>

            <a href="#services">Training</a>
            <a href="#services">Keynote Sessions</a>
            <a href="#services">Medical Mobile Clinic</a>
          </div>
        </div>
      </div>

      <nav className="slide-menu" id="example-menu" ref={mobileSideNav}>
        <div className="controls">
          <button
            type="button"
            className="btn slide-menu__control"
            data-action="back"
          >
            Back
          </button>
          <button
            type="button"
            className="btn slide-menu__control"
            onClick={closeMenu}
          >
            Close
          </button>
        </div>
        <ul>
          <li>
            <a href="#">About Us</a>
            <ul>
              <li>
                <a href="#">Our 'green' Story</a>
              </li>
              <li>
                <a href="#">Our 'green' Journey</a>
              </li>
              <li>
                <a href="#">Innovations</a>
                <ul>
                  <li>
                    <a href="#">Organic Waste to biofuel</a>
                  </li>
                  <li>
                    <a href="#">Plastic Waste to biofuel</a>
                  </li>
                  <li>
                    <a href="#">Medical Mobile Clinic</a>
                  </li>
                  <li>
                    <a href="#">Polluted Air to Clean Air</a>
                  </li>
                  <li>
                    <a href="#">Electric Transportation</a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#">Our Services</a>
                <ul>
                  <li>
                    <a href="#">Turnkey bio-refinery project</a>
                  </li>
                  <li>
                    <a href="#">Consultancy</a>
                  </li>
                  <li>
                    <a href="#">Trainings</a>
                  </li>
                  <li>
                    <a href="#">Keynote Sessions</a>
                  </li>
                  <li>
                    <a href="#">Medical Mobile Clinic</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Team and Think Tank</a>
              </li>
              <li>
                <a href="#">Our Clients</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/blog">Master Class</a>
          </li>
          <li>
            <a href="/about">Eco Store</a>
          </li>
          <li>
            <a href="/about">More</a>
            <ul>
              <li>
                <a href="#">Media</a>
              </li>
              <li>
                <a href="#">Invite us at your event</a>
              </li>
              <li>
                <a href="#">'green' Opportunities</a>
              </li>
              <li>
                <a href="#"> Events</a>
                <ul>
                  <li>
                    <a href="#">Online Events</a>
                  </li>
                  <li>
                    <a href="#">Offline Events</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Forum</a>
              </li>
              <li>
                <a href="#">Circulars</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Join our Whatsapp group for Free</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
