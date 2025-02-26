const grade = [ "S", "A", "B", "C", "D", "R", "" ];

let portalp_sort_flag = 0;

window.addEventListener( "load", function( ) {
    if( document.querySelector("#tabnavigation_list") == null ) {
        return;
    }

    if( document.querySelector("#title > h2").innerText == "成績照会" ) {
        if( document.querySelector("#tabnavigation_list > ul > li.active").innerText == "成績" ) {
            portalp_add_menu( 0 );
            portalp_color_map( 10 );

        } else if( document.querySelector("#tabnavigation_list > ul > li.active").innerText == "出席" ) {
            portalp_add_menu( 1 );
            portalp_color_map( 4 );
        }
    }
});

function portalp_add_menu( selector ) {
    if( selector == 0 ) {
        var element =`
        <div class="contents_1" style="margin-top:0px; padding:5px 0px 10px;">
            <table class="form">
                <tbody><tr>
                    <td style="width:20%" class="label_accent"><span style="margin-top:0px">成績表フィルター</span></td>
                    <td class="line_y_label_accent"></td>
                    <td class="item">
                        <label>
                            <input class="portalp_chkbtn" type="checkbox" name="semester" value="1" checked />
                            前期
                        </label>
                        <label>
                            <input class="portalp_chkbtn" type="checkbox" name="semester" value="2" checked />
                            後期
                        </label>
                    </td>
                    <td class="line_y"></td>
                    <td class="item" id="portalp_sort_btn_box">
                        <span>ソート : </span>
                        <button type="button" id="portalp_grade" class="portalp_sort_btn">評価</button>
                        <button type="button" id="portalp_attend" class="portalp_sort_btn">出席率</button>
                        <button type="button" id="portalp_assign" class="portalp_sort_btn">課題提出率</button>
                    </td>
                </tr></tbody>
            </table>
        </div>`

        frame = document.querySelector( "#changeArea > div:nth-child(5) > div.contents_1" );
        frame.insertAdjacentHTML( "afterend", element );

        document.getElementById( "portalp_grade" ).addEventListener( "click", { id: 0, selector: 6, handleEvent: portalp_btn_click });
        document.getElementById( "portalp_attend" ).addEventListener( "click", { id: 1, selector: 10, handleEvent: portalp_btn_click });
        document.getElementById( "portalp_assign" ).addEventListener( "click", { id: 2, selector: 14, handleEvent: portalp_btn_click });

        document.querySelectorAll( ".portalp_chkbtn" ).forEach( function( element ) {
            element.addEventListener( "change", portalp_sort_semester );
        });
    } else if( selector == 1 ) {
        var element =`
        <div class="contents_1" style="margin-top:0px; padding:5px 0px 10px;">
            <table class="form">
                <tbody><tr>
                    <td style="width:20%" class="label_accent"><span style="margin-top:0px">成績表フィルター</span></td>
                    <td class="line_y_label_accent"></td>
                    <td class="item" id="portalp_sort_btn_box">
                        <span>ソート : </span>
                        <button type="button" id="portalp_attend_per" class="portalp_sort_btn">出席率</button>
                        <button type="button" id="portalp_unit" class="portalp_sort_btn">総単元数</button>
                        <button type="button" id="portalp_attend" class="portalp_sort_btn">出席</button>
                        <button type="button" id="portalp_absence" class="portalp_sort_btn">欠席</button>
                        <button type="button" id="portalp_behind" class="portalp_sort_btn">遅刻</button>
                        <button type="button" id="portalp_leave" class="portalp_sort_btn">早退</button>
                        <button type="button" id="portalp_auth_absence" class="portalp_sort_btn">公欠</button>
                        <button type="button" id="portalp_lack" class="portalp_sort_btn">不足</button>
                    </td>
                </tr></tbody>
            </table>
        </div>`

        frame = document.querySelector( "#changeArea > div:nth-child(4) > div.contents_1" );
        frame.insertAdjacentHTML( "afterend", element );

        document.getElementById( "portalp_attend_per" ).addEventListener( "click", { id: 0, selector: 4, handleEvent: portalp_btn_click });
        document.getElementById( "portalp_unit" ).addEventListener( "click", { id: 1, selector: 6, handleEvent: portalp_btn_click });
        document.getElementById( "portalp_attend" ).addEventListener( "click", { id: 2, selector: 8, handleEvent: portalp_btn_click });
        document.getElementById( "portalp_absence" ).addEventListener( "click", { id: 3, selector: 10, handleEvent: portalp_btn_click });
        document.getElementById( "portalp_behind" ).addEventListener( "click", { id: 4, selector: 12, handleEvent: portalp_btn_click });
        document.getElementById( "portalp_leave" ).addEventListener( "click", { id: 5, selector: 14, handleEvent: portalp_btn_click });
        document.getElementById( "portalp_auth_absence" ).addEventListener( "click", { id: 6, selector: 16, handleEvent: portalp_btn_click });
        document.getElementById( "portalp_lack" ).addEventListener( "click", { id: 7, selector: 18, handleEvent: portalp_btn_click });
    }
}

function portalp_btn_click( e ) {
    if( this.id == 0 && this.selector == 6 ) {
        portalp_sort_reset( this.id );
        portalp_sort_grade( this.id, this.selector );

    } else {
        portalp_sort_reset( this.id );
        portalp_sort_number( this.id, this.selector );
    }
}

function portalp_sort_semester( ) {
    var selector = 0;
    var table = document.querySelectorAll( "#changeArea > div > table > tbody > tr" );

    document.querySelectorAll( ".portalp_chkbtn:checked" ).forEach( function( element ) {
        selector += parseInt( element.value );
    });

    for( var i = 2; i < table.length - 1; i += 2 ) {
        table[ i ].classList.add( "portalp_visible" );
        table[ i ].classList.remove( "portalp_hidden" );

        data = table[ i ].innerText.split( '\t' );

        switch( selector ) {
            case 0:
                table[ i ].classList.add( "portalp_hidden" );
                table[ i ].classList.remove( "portalp_visible" );
                break;

            case 1:
                if (data[ 4 ] != "前期" ) {
                    table[ i ].classList.add( "portalp_hidden" );
                    table[ i ].classList.remove( "portalp_visible" );
                }
                break;

            case 2:
                if (data[ 4 ] != "後期" ) {
                    table[ i ].classList.add( "portalp_hidden" );
                    table[ i ].classList.remove( "portalp_visible" );
                }
                break;
        }
    }
}

function portalp_data_molding( ) {
    var data = [ ];
    var line = [ ];
    var table = document.querySelectorAll( "#changeArea > div > table > tbody > tr" );

    for( var i = 2; i < table.length - 1; i++ ) {
        if( i % 2 == 0 ) {
            data.push( table[ i ]);
        } else {
            line.push( table[ i ]);
        }
    }

    return [ data, line ];
}

function portalp_sort_grade( id, selector ) {
    var [ data, line ] = portalp_data_molding( );

    sort_data = [ ].slice.call( data ).map( function( v ) {
        var val = v.innerText != "" ? v.innerText.split( '\t' )[ selector ] : 0;
        return { dom: v, val: val };
    });

    if( portalp_sort_flag != 1 << 7 - id ) {
        portalp_sort_flag = 1 << 7 - id;

        document.getElementById( "portalp_grade" ).style.setProperty( "--triangle_up_visibility", "none" );
        document.getElementById( "portalp_grade" ).style.setProperty( "--triangle_down_visibility", "" );

        sort_data.sort( function( a, b ){
            return grade.indexOf( a.val ) - grade.indexOf( b.val );
        });
    } else {
        portalp_sort_flag = 0;

        document.getElementById( "portalp_grade" ).style.setProperty( "--triangle_up_visibility", "" );
        document.getElementById( "portalp_grade" ).style.setProperty( "--triangle_down_visibility", "none" );

        sort_data.sort( function( a, b ){
            return grade.indexOf( b.val ) - grade.indexOf( a.val );
        });
    }

    portalp_display( data.length, sort_data, line );
}

function portalp_sort_number( id, selector ) {
    var [ data, line ] = portalp_data_molding( );

    sort_data = [ ].slice.call( data ).map( function( v ) {
        var val = v.innerText != "" ? v.innerText.split( '\t' )[ selector ] : 0;
        return { dom: v, val: val };
    });

    if( portalp_sort_flag != 1 << 7 - id ) {
        portalp_sort_flag = 1 << 7 - id;

        document.querySelector( `#portalp_sort_btn_box > button:nth-of-type(${ id + 1 })` ).style.setProperty( "--triangle_up_visibility", "none" );
        document.querySelector( `#portalp_sort_btn_box > button:nth-of-type(${ id + 1 })` ).style.setProperty( "--triangle_down_visibility", "" );

        sort_data.sort( function( a, b ){
            return Number( b.val ) - Number( a.val );
        });
    } else {
        portalp_sort_flag = 0;

        document.querySelector( `#portalp_sort_btn_box > button:nth-of-type(${ id + 1 })` ).style.setProperty( "--triangle_up_visibility", "" );
        document.querySelector( `#portalp_sort_btn_box > button:nth-of-type(${ id + 1 })` ).style.setProperty( "--triangle_down_visibility", "none" );

        sort_data.sort( function( a, b ){
            return Number( a.val ) - Number( b.val );
        });
    }

    portalp_display( data.length, sort_data, line );
}

function portalp_sort_reset( num ) {
    portalp_sort_flag &= 1 << 7 - num;

    document.querySelectorAll( "#portalp_sort_btn_box > button" ).forEach( function( element ) {
        element.style = null;
    });
}

function portalp_display( length, data, line ) {
    for( var i = 0; i < length; i++ ) {
        document.querySelector( `#changeArea > div > table > tbody > tr:nth-child(${ i * 2 + 2 })` ).after( data[ i ].dom );
        document.querySelector( `#changeArea > div > table > tbody > tr:nth-child(${ i * 2 + 3 })` ).after( line[ i ] );
    }
}

function portalp_color_map( selector ) {
    var table = document.querySelectorAll( "#changeArea > div > table > tbody > tr" );

    for( var i = 2; i < table.length - 1; i += 2 ) {
        var val = table[ i ].innerText != "" ? table[ i ].innerText.split( '\t' )[ selector ] : 0;

        if( 90 <= val && val < 95 ) {
            table[ i ].classList.add( "portalp_caution" );

        } else if( 85 <= val && val < 90 ) {
            table[ i ].classList.add( "portalp_warning" );

        } else if( 80 <= val && val < 85 ) {
            table[ i ].classList.add( "portalp_alert" );

        } else if( val < 80 ) {
            table[ i ].classList.add( "portalp_fail" );
        }
    }
}