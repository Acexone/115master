import { GM_openInTab, GM_setValue } from "$";
import GM_VALUE_KEY from "../constants/gm.value.key";
import type { PlayingVideoInfo } from "../types/player";

export const goToPlayer = (
	playingVideoInfo: PlayingVideoInfo,
	isOpenInTab = false,
) => {
	GM_setValue(GM_VALUE_KEY.PLAYING_VIDEO_INFO, playingVideoInfo);
	const params = new URLSearchParams({
		pick_code: playingVideoInfo.pickCode,
		avNumber: playingVideoInfo.avNumber || "",
		title: playingVideoInfo.title,
	});
	const url = `https://dl.115cdn.net/fuckkk/player/?${params.toString()}`;
	if (isOpenInTab) {
		GM_openInTab(url, {
			active: true,
		});
		return;
	}

	history.pushState({}, "", url);
};
