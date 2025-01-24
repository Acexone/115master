import { GM_openInTab, GM_setValue } from '$';
import $ from 'jquery';
import GM_VALUE_KEY from '../constants/gm.value.key';

class HomeScript {

    constructor() {
        console.log('Home');
        this.init()
    }


    init() {
        console.log('Home init');
        this.addFileListItemHouverMenu()
    }


    addFileListItemHouverMenu() {
        var herfv = 'li[file_type="1"]:has(.duration):not([file_mode="4"],[paly_button="1"])';
        $('body').on('mouseenter', herfv, function () {
            var $El = $(this).attr('paly_button', 1);
            const buttons = [
                {
                    class: 'Dp',
                    title: '使用Master播放视频',
                    text: '🚀 Master播放'
                }
            ]

            buttons.forEach(button => {
                $El.find('.file-opr').prepend('<a href="javascript:;" class=' + button.class + ' title=' + button.title + '><span>' + button.text + '</span></a>');
            });
            $El.not('.name').click(function () {
                const playingVideoInfo = {
                    pickCode: $El.attr('pick_code'),
                    title: $El.attr('title'),
                }

                console.log('即将播放', playingVideoInfo);
                GM_setValue(GM_VALUE_KEY.PLAYING_VIDEO_INFO, playingVideoInfo)
                const url = `https://115.com/web/lixian/?pick_code=${playingVideoInfo.pickCode}`
                GM_openInTab(url, {
                    active: true
                })
                return false;
            });
        });
    }
}

export default HomeScript;
