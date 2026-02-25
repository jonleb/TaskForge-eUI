# showcase dev guide   videos

```html
<eui-page>
    <eui-page-header label="eUI Videos library"></eui-page-header>
    <eui-page-content>

        <div class="eui-u-text-h3 eui-u-mb-l">General playlist</div>

        <div class="eui-u-flex">
            <img src="assets/docs/images/eui-training-videos-playlist.png" width="25%"/>
            <a euiButton euiPrimary euiOutline class="eui-u-ml-l" href="https://www.youtube.com/watch?v=zJM02FxjXPg&list=PLfykDplQxUmNZOysysDB2TpfL7SZfYx1e" target="_blank">
                Watch the playlist on youtube
            </a>
        </div>


        <br><br>

        <div class="eui-u-text-h3 eui-u-mb-l">All videos library</div>

        <div class="row">
            @for (video of videos; track video.title) {

                <div class="col-xl-3 col-lg-4 col-md-6">

                    <eui-card euiNoContentPadding>
                        <eui-card-header>
                            <eui-card-header-title>
                                {{ video.title }}
                            </eui-card-header-title>
                        </eui-card-header>
                        <eui-card-content>
                            <iframe
                                width="450" height="280"
                                [src]="video.url | safe"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen>
                            </iframe>
                        </eui-card-content>
                    </eui-card>

                </div>
            }
        </div>

    </eui-page-content>
</eui-page>
```
