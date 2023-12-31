// @generated by protoc-gen-es v1.3.1 with parameter "target=js"
// @generated from file bilibili/app/viewunite/pgcanymodel.proto (package bilibili.app.viewunite.pgcanymodel, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";
import { BadgeInfo, NewEp, Staff, StatInfo, ViewEpisode } from "./common_pb.js";

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.pgcanymodel.Earphone
 */
export const Earphone = proto3.makeMessageType(
  "bilibili.app.viewunite.pgcanymodel.Earphone",
  () => [
    { no: 1, name: "product_model", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "like_toast_text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "switch_toast_text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "like_toast_voice", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.pgcanymodel.EarphoneConf
 */
export const EarphoneConf = proto3.makeMessageType(
  "bilibili.app.viewunite.pgcanymodel.EarphoneConf",
  () => [
    { no: 1, name: "sp_phones", kind: "message", T: Earphone, repeated: true },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.pgcanymodel.MultiViewInfo
 */
export const MultiViewInfo = proto3.makeMessageType(
  "bilibili.app.viewunite.pgcanymodel.MultiViewInfo",
  () => [
    { no: 1, name: "is_multi_view_season", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "changing_dance", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.pgcanymodel.OgvData
 */
export const OgvData = proto3.makeMessageType(
  "bilibili.app.viewunite.pgcanymodel.OgvData",
  () => [
    { no: 1, name: "media_id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "season_id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "season_type", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "show_season_type", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "rights", kind: "message", T: Rights },
    { no: 6, name: "user_status", kind: "message", T: UserStatus },
    { no: 7, name: "aid", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 8, name: "stat", kind: "message", T: Stat },
    { no: 9, name: "mode", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 10, name: "publish", kind: "message", T: Publish },
    { no: 11, name: "play_strategy", kind: "message", T: PlayStrategy },
    { no: 12, name: "multi_view_info", kind: "message", T: MultiViewInfo },
    { no: 13, name: "ogv_switch", kind: "message", T: OgvSwitch },
    { no: 14, name: "total_ep", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 15, name: "new_ep", kind: "message", T: NewEp },
    { no: 16, name: "reserve", kind: "message", T: Reserve },
    { no: 17, name: "status", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 18, name: "activity_float_layer", kind: "message", T: PlayFloatLayerActivity, repeated: true },
    { no: 19, name: "earphone_conf", kind: "message", T: EarphoneConf },
    { no: 20, name: "cover", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 21, name: "square_cover", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 22, name: "share_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 23, name: "short_link", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 24, name: "title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 25, name: "horizontal_cover169", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 26, name: "horizontal_cover1610", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 27, name: "has_can_play_ep", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.pgcanymodel.OgvSwitch
 */
export const OgvSwitch = proto3.makeMessageType(
  "bilibili.app.viewunite.pgcanymodel.OgvSwitch",
  () => [
    { no: 1, name: "reduce_short_title_spacing", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "merge_position_section_for_cinema", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "merge_preview_section", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "enable_show_vt_info", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * 播放器浮层广告(?)
 *
 * @generated from message bilibili.app.viewunite.pgcanymodel.PlayFloatLayerActivity
 */
export const PlayFloatLayerActivity = proto3.makeMessageType(
  "bilibili.app.viewunite.pgcanymodel.PlayFloatLayerActivity",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "type", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "ad_badge_type", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "link", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "pic_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "pic_anima_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "badge", kind: "message", T: BadgeInfo },
    { no: 9, name: "show_rate_time", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.pgcanymodel.PlayStrategy
 */
export const PlayStrategy = proto3.makeMessageType(
  "bilibili.app.viewunite.pgcanymodel.PlayStrategy",
  () => [
    { no: 1, name: "strategies", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 2, name: "recommend_show_strategy", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "auto_play_toast", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.pgcanymodel.Publish
 */
export const Publish = proto3.makeMessageType(
  "bilibili.app.viewunite.pgcanymodel.Publish",
  () => [
    { no: 1, name: "pub_time", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "pub_time_show", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "is_started", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "is_finish", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "weekday", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "release_date_show", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "time_length_show", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "unknow_pub_date", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 9, name: "update_info_desc", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.pgcanymodel.Reserve
 */
export const Reserve = proto3.makeMessageType(
  "bilibili.app.viewunite.pgcanymodel.Reserve",
  () => [
    { no: 1, name: "episodes", kind: "message", T: ViewEpisode, repeated: true },
    { no: 2, name: "tip", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 权限相关信息
 *
 * @generated from message bilibili.app.viewunite.pgcanymodel.Rights
 */
export const Rights = proto3.makeMessageType(
  "bilibili.app.viewunite.pgcanymodel.Rights",
  () => [
    { no: 1, name: "allow_download", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "allow_review", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "can_watch", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "is_cover_show", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "copyright", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "copyright_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "allow_bp", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 8, name: "area_limit", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 9, name: "is_preview", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 10, name: "ban_area_show", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 11, name: "watch_platform", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 12, name: "allow_bp_rank", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 13, name: "resource", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 14, name: "forbid_pre", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 15, name: "only_vip_download", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 16, name: "new_allow_download", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.pgcanymodel.Stat
 */
export const Stat = proto3.makeMessageType(
  "bilibili.app.viewunite.pgcanymodel.Stat",
  () => [
    { no: 1, name: "followers", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "play_data", kind: "message", T: StatInfo },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.pgcanymodel.UserStatus
 */
export const UserStatus = proto3.makeMessageType(
  "bilibili.app.viewunite.pgcanymodel.UserStatus",
  () => [
    { no: 1, name: "show", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "follow", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "follow_status", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "pay", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "sponsor", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "vip", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 7, name: "vip_frozen", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 8, name: "watch_progress", kind: "message", T: WatchProgress },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.pgcanymodel.ViewPgcAny
 */
export const ViewPgcAny = proto3.makeMessageType(
  "bilibili.app.viewunite.pgcanymodel.ViewPgcAny",
  () => [
    { no: 1, name: "ogv_data", kind: "message", T: OgvData },
    { no: 2, name: "all_up_info", kind: "map", K: 3 /* ScalarType.INT64 */, V: {kind: "message", T: Staff} },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.pgcanymodel.WatchProgress
 */
export const WatchProgress = proto3.makeMessageType(
  "bilibili.app.viewunite.pgcanymodel.WatchProgress",
  () => [
    { no: 1, name: "last_ep_id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "last_ep_index", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "last_time", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ],
);

