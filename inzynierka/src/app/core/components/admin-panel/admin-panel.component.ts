import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})

/***
 * Blog Component
 */
export class AdminPanelComponent implements OnInit {

    /***
     * Nav bg light calss Add
     */
    navClass = 'bg-white';

    /***
     * Main Slider navigation Add
     */
    showNavigationArrows = true;
    showNavigationIndicators = false;

    /**
     * Blog Data
     */
    blogData = [
        // {
        //     image: "assets/images/blog/01.jpg",
        //     title: "Design your apps in your own way",
        //     name: "Calvin Carlo",
        //     date: "13th August, 2019"
        // },
        // {
        //     image: "assets/images/blog/02.jpg",
        //     title: "How apps is changing the IT world",
        //     like: "33",
        //     message: "08",
        //     name: "Calvin Carlo",
        //     date: "13th August, 2019"
        // },
        // {
        //     image: "assets/images/blog/03.jpg",
        //     title: "Smartest Applications for Business",
        //     like: "33",
        //     message: "08",
        //     name: "Calvin Carlo",
        //     date: "13th August, 2019"
        // }
    ];

    /**
     * Resent Post Data
     */
    resentPostData = [
        {
            image: "assets/images/blog/04.jpg",
            title: "How apps is changing the IT world",
            like: "33",
            message: "08",
            name: "Calvin Carlo",
            date: "13th August, 2019"
        },
        {
            image: "assets/images/blog/05.jpg",
            title: "Design your apps in your own way",
            like: "33",
            message: "08",
            name: "Calvin Carlo",
            date: "13th August, 2019"
        },
        {
            image: "assets/images/blog/06.jpg",
            title: "Smartest Applications for Business",
            like: "33",
            message: "08",
            name: "Calvin Carlo",
            date: "13th August, 2019"
        }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
