import {Component, OnInit, Input} from "@angular/core";
import {Router, NavigationEnd} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IndexBlogComponent} from "../../core/components/index-blog/index-blog.component";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})

/***
 * Header Component
 */
export class HeaderComponent implements OnInit {



    constructor(private router: Router,
                private modalService: NgbModal) {
        this.router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {

            }
        });
    }

    isCondensed = false;

    ngOnInit(): void {
    }


    toggleMenu() {
        this.isCondensed = !this.isCondensed;
        if (this.isCondensed) {
            document.getElementById("navigation").style.display = "block";
        } else {
            document.getElementById("navigation").style.display = "none";
        }
    }


    scroll_news() {
        document.querySelector('#news').scrollIntoView({behavior: 'smooth', block: 'center'});
    }

    scroll_all() {
        document.querySelector('#all').scrollIntoView({behavior: 'smooth', block: 'center'});
    }

    scroll_home() {
        document.querySelector('#home').scrollIntoView({behavior: 'smooth', block: 'center'});
    }
}
