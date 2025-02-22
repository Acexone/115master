import { GM_openInTab, GM_setValue } from "$";
import { DL_HOST_155 } from "../constants/115";
import GM_VALUE_KEY from "../constants/gm.value.key";
import type { PlayingVideoInfo } from "../types/player";

export const goToPlayer = (
	playingVideoInfo: PlayingVideoInfo,
	isOpenInTab = false,
) => {
	GM_setValue(GM_VALUE_KEY.PLAYING_VIDEO_INFO, playingVideoInfo);
	const params = new URLSearchParams({
		cid: playingVideoInfo.cid || "",
		pick_code: playingVideoInfo.pickCode,
		avNumber: playingVideoInfo.avNumber || "",
		title: playingVideoInfo.title,
	});
	const url = `https://${DL_HOST_155}/master/video/?${params.toString()}`;
	if (isOpenInTab) {
		GM_openInTab(url, {
			active: true,
		});
		return;
	}

	history.pushState({}, "", url);
};
