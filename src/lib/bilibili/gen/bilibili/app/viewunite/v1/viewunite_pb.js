// @generated by protoc-gen-es v1.3.1 with parameter "target=js"
// @generated from file bilibili/app/viewunite/v1/viewunite.proto (package bilibili.app.viewunite.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Any, proto3 } from "@bufbuild/protobuf";
import { ActivityTab, Module, Owner, RelateCard, Stat, UpLikeImg } from "../common_pb.js";
import { Pagination } from "../../../pagination/pagination_pb.js";
import { PlayerArgs } from "../../archive/middleware/v1/preload_pb.js";

/**
 * @generated from enum bilibili.app.viewunite.v1.BizType
 */
export const BizType = proto3.makeEnum(
  "bilibili.app.viewunite.v1.BizType",
  [
    {no: 0, name: "BizTypeNone"},
    {no: 1, name: "BizTypeFollowVideo"},
    {no: 2, name: "BizTypeReserveActivity"},
    {no: 3, name: "BizTypeJumpLink"},
    {no: 4, name: "BizTypeFavSeason"},
    {no: 5, name: "BizTypeReserveGame"},
  ],
);

/**
 * @generated from enum bilibili.app.viewunite.v1.ECode
 */
export const ECode = proto3.makeEnum(
  "bilibili.app.viewunite.v1.ECode",
  [
    {no: 0, name: "CODE_DEFAULT"},
    {no: 1, name: "CODE_404"},
    {no: 78301, name: "CODE_TEENAGER"},
  ],
);

/**
 * @generated from enum bilibili.app.viewunite.v1.JumpShowType
 */
export const JumpShowType = proto3.makeEnum(
  "bilibili.app.viewunite.v1.JumpShowType",
  [
    {no: 0, name: "JST_DEFAULT"},
    {no: 1, name: "JST_FULLSCREEN"},
    {no: 2, name: "JST_HALFSCREEN"},
  ],
);

/**
 * 素材类型
 *
 * @generated from enum bilibili.app.viewunite.v1.MaterialBizType
 */
export const MaterialBizType = proto3.makeEnum(
  "bilibili.app.viewunite.v1.MaterialBizType",
  [
    {no: 0, name: "NONE"},
    {no: 1, name: "ACTIVITY"},
    {no: 2, name: "BGM"},
    {no: 3, name: "EFFECT"},
    {no: 4, name: "SHOOT_SAME"},
    {no: 5, name: "SHOOT_TOGETHER"},
    {no: 6, name: "ACTIVITY_ICON"},
    {no: 7, name: "NEW_BGM"},
  ],
);

/**
 * 素材来源
 *
 * @generated from enum bilibili.app.viewunite.v1.MaterialSource
 */
export const MaterialSource = proto3.makeEnum(
  "bilibili.app.viewunite.v1.MaterialSource",
  [
    {no: 0, name: "DEFAULT"},
    {no: 1, name: "BIJIAN"},
  ],
);

/**
 * 
 *
 * @generated from enum bilibili.app.viewunite.v1.PageCategory
 */
export const PageCategory = proto3.makeEnum(
  "bilibili.app.viewunite.v1.PageCategory",
  [
    {no: 0, name: "COMMON_PAGE"},
    {no: 1, name: "ACTIVITY_PAGE"},
  ],
);

/**
 * 页面类型
 *
 * @generated from enum bilibili.app.viewunite.v1.PageType
 */
export const PageType = proto3.makeEnum(
  "bilibili.app.viewunite.v1.PageType",
  [
    {no: 0, name: "H5"},
    {no: 1, name: "NA"},
  ],
);

/**
 * @generated from enum bilibili.app.viewunite.v1.PlayToastEnum
 */
export const PlayToastEnum = proto3.makeEnum(
  "bilibili.app.viewunite.v1.PlayToastEnum",
  [
    {no: 0, name: "PLAYTOAST_UNKNOWN"},
    {no: 1, name: "PLAYTOAST_CHARGINGPLUS"},
  ],
);

/**
 * @generated from enum bilibili.app.viewunite.v1.TabType
 */
export const TabType = proto3.makeEnum(
  "bilibili.app.viewunite.v1.TabType",
  [
    {no: 0, name: "TAB_NONE"},
    {no: 1, name: "TAB_INTRODUCTION"},
    {no: 2, name: "TAB_REPLY"},
    {no: 3, name: "TAB_OGV_ACTIVITY"},
  ],
);

/**
 * 
 *
 * @generated from enum bilibili.app.viewunite.v1.UnionType
 */
export const UnionType = proto3.makeEnum(
  "bilibili.app.viewunite.v1.UnionType",
  [
    {no: 0, name: "UGC"},
    {no: 1, name: "OGV"},
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ActivityResource
 */
export const ActivityResource = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ActivityResource",
  () => [
    { no: 1, name: "dark_text_color", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "divider_color", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "bg_color", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "selected_bg_color", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "text_color", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "light_text_color", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 业务信息
 *
 * @generated from message bilibili.app.viewunite.v1.Arc
 */
export const Arc = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.Arc",
  () => [
    { no: 1, name: "aid", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "cid", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "duration", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "stat", kind: "message", T: Stat },
    { no: 5, name: "bvid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "copyright", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 7, name: "right", kind: "message", T: Rights },
    { no: 8, name: "cover", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "type_id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 10, name: "title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ArcRefreshReply
 */
export const ArcRefreshReply = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ArcRefreshReply",
  () => [
    { no: 1, name: "stat", kind: "message", T: Stat },
    { no: 2, name: "req_user", kind: "message", T: SimpleReqUser },
    { no: 3, name: "arc", kind: "message", T: SimpleArc },
    { no: 4, name: "online", kind: "message", T: Online },
    { no: 5, name: "like_config", kind: "message", T: LikeConfig },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ArcRefreshReq
 */
export const ArcRefreshReq = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ArcRefreshReq",
  () => [
    { no: 1, name: "aid", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "bvid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.AttentionCard
 */
export const AttentionCard = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.AttentionCard",
  () => [
    { no: 1, name: "show_time", kind: "message", T: ShowTime, repeated: true },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.BizFollowVideoParam
 */
export const BizFollowVideoParam = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.BizFollowVideoParam",
  () => [
    { no: 1, name: "season_id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.BizJumpLinkParam
 */
export const BizJumpLinkParam = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.BizJumpLinkParam",
  () => [
    { no: 1, name: "url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.BizReserveActivityParam
 */
export const BizReserveActivityParam = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.BizReserveActivityParam",
  () => [
    { no: 1, name: "activity_id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "from", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "oid", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 5, name: "reserve_id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.BizReserveGameParam
 */
export const BizReserveGameParam = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.BizReserveGameParam",
  () => [
    { no: 1, name: "game_id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.Button
 */
export const Button = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.Button",
  () => [
    { no: 1, name: "title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "uri", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "icon", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "jump_show_type", kind: "enum", T: proto3.getEnumType(JumpShowType) },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ChargingPlus
 */
export const ChargingPlus = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ChargingPlus",
  () => [
    { no: 1, name: "pass", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "play_toast", kind: "message", T: PlayToast, repeated: true },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.Chronos
 */
export const Chronos = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.Chronos",
  () => [
    { no: 1, name: "md5", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "file", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "sign", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ChronosParam
 */
export const ChronosParam = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ChronosParam",
  () => [
    { no: 1, name: "engine_version", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "message_protocol", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "service_key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 推广信息
 *
 * @generated from message bilibili.app.viewunite.v1.CM
 */
export const CM = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.CM",
  () => [
    { no: 1, name: "cm_under_player", kind: "message", T: Any },
    { no: 2, name: "ads_control", kind: "message", T: Any },
    { no: 3, name: "source_content", kind: "message", T: Any, repeated: true },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.CommandDm
 */
export const CommandDm = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.CommandDm",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "oid", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "mid", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "command", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "progress", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 7, name: "ctime", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "mtime", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "extra", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 10, name: "idstr", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 播放器配置
 *
 * @generated from message bilibili.app.viewunite.v1.Config
 */
export const Config = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.Config",
  () => [
    { no: 1, name: "online", kind: "message", T: Online },
    { no: 2, name: "player_icon", kind: "message", T: PlayerIcon },
    { no: 3, name: "story_entrance", kind: "message", T: StoryEntrance },
  ],
);

/**
 * 视频播放时弹出的卡片
 *
 * @generated from message bilibili.app.viewunite.v1.ContractCard
 */
export const ContractCard = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ContractCard",
  () => [
    { no: 1, name: "display_progress", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 2, name: "display_accuracy", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "display_duration", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "show_mode", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "page_type", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "upper", kind: "message", T: UpperInfos },
    { no: 7, name: "is_follow_display", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 8, name: "text", kind: "message", T: ContractText },
    { no: 9, name: "follow_display_end_duration", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 10, name: "is_play_display", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 11, name: "is_interact_display", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * 视频播放时弹出的卡片的文字说明信息
 *
 * @generated from message bilibili.app.viewunite.v1.ContractText
 */
export const ContractText = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ContractText",
  () => [
    { no: 1, name: "title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "subtitle", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "inline_title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.Control
 */
export const Control = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.Control",
  () => [
    { no: 1, name: "limit", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.DmResource
 */
export const DmResource = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.DmResource",
  () => [
    { no: 1, name: "command_dms", kind: "message", T: CommandDm, repeated: true },
    { no: 2, name: "attention", kind: "message", T: AttentionCard },
    { no: 3, name: "cards", kind: "message", T: OperationCard, repeated: true },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ECodeConfig
 */
export const ECodeConfig = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ECodeConfig",
  () => [
    { no: 1, name: "redirect_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.IconData
 */
export const IconData = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.IconData",
  () => [
    { no: 1, name: "meta_json", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "sprits_img", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 视频介绍 Tab
 *
 * @generated from message bilibili.app.viewunite.v1.IntroductionTab
 */
export const IntroductionTab = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.IntroductionTab",
  () => [
    { no: 1, name: "title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "modules", kind: "message", T: Module, repeated: true },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.LikeConfig
 */
export const LikeConfig = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.LikeConfig",
  () => [
    { no: 1, name: "triple_like", kind: "message", T: UpLikeImg },
    { no: 2, name: "like_animation", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 素材详情
 *
 * @generated from message bilibili.app.viewunite.v1.Material
 */
export const Material = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.Material",
  () => [
    { no: 1, name: "icon", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "type", kind: "enum", T: proto3.getEnumType(MaterialBizType) },
    { no: 5, name: "param", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "static_icon", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "bg_color", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "bg_pic", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "jump_type", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 10, name: "page_type", kind: "enum", T: proto3.getEnumType(PageType) },
    { no: 11, name: "need_login", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.Online
 */
export const Online = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.Online",
  () => [
    { no: 1, name: "online_show", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.OperationCard
 */
export const OperationCard = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.OperationCard",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "from", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "to", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "status", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 5, name: "biz_type", kind: "enum", T: proto3.getEnumType(BizType) },
    { no: 6, name: "content", kind: "message", T: OperationCardContent },
    { no: 7, name: "follow", kind: "message", T: BizFollowVideoParam, oneof: "param" },
    { no: 8, name: "reserve", kind: "message", T: BizReserveActivityParam, oneof: "param" },
    { no: 9, name: "jump", kind: "message", T: BizJumpLinkParam, oneof: "param" },
    { no: 10, name: "game", kind: "message", T: BizReserveGameParam, oneof: "param" },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.OperationCardContent
 */
export const OperationCardContent = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.OperationCardContent",
  () => [
    { no: 1, name: "title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "subtitle", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "icon", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "button_title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "button_selected_title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "show_selected", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.PageControl
 */
export const PageControl = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.PageControl",
  () => [
    { no: 1, name: "toast_show", kind: "message", T: Control },
    { no: 2, name: "material_show", kind: "message", T: Control },
    { no: 3, name: "up_show", kind: "message", T: Control },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.PlayerIcon
 */
export const PlayerIcon = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.PlayerIcon",
  () => [
    { no: 1, name: "url1", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "hash1", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "url2", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "hash2", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "drag_left_png", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "middle_png", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "drag_right_png", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "drag_data", kind: "message", T: IconData },
    { no: 9, name: "nodrag_data", kind: "message", T: IconData },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.PlayToast
 */
export const PlayToast = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.PlayToast",
  () => [
    { no: 1, name: "business", kind: "enum", T: proto3.getEnumType(PlayToastEnum) },
    { no: 2, name: "icon_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.PointMaterial
 */
export const PointMaterial = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.PointMaterial",
  () => [
    { no: 1, name: "url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "material_source", kind: "enum", T: proto3.getEnumType(MaterialSource) },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.Relate
 */
export const Relate = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.Relate",
  () => [
    { no: 1, name: "device_type", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "pagination", kind: "message", T: Pagination },
  ],
);

/**
 * 视频详情页下方推荐 Reply
 *
 * @generated from message bilibili.app.viewunite.v1.RelatesFeedReply
 */
export const RelatesFeedReply = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.RelatesFeedReply",
  () => [
    { no: 1, name: "relates", kind: "message", T: RelateCard, repeated: true },
    { no: 2, name: "pagination", kind: "message", T: Pagination },
  ],
);

/**
 * 视频详情页下方推荐 Req
 *
 * @generated from message bilibili.app.viewunite.v1.RelatesFeedReq
 */
export const RelatesFeedReq = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.RelatesFeedReq",
  () => [
    { no: 1, name: "aid", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "bvid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "from", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "spmid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "from_spmid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "player_args", kind: "message", T: PlayerArgs },
    { no: 7, name: "pagination", kind: "message", T: Pagination },
    { no: 8, name: "session_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "auto_play", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 10, name: "from_track_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ReplyStyle
 */
export const ReplyStyle = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ReplyStyle",
  () => [
    { no: 1, name: "badge_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "badge_text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "badge_type", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ReplyTab
 */
export const ReplyTab = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ReplyTab",
  () => [
    { no: 1, name: "reply_style", kind: "message", T: ReplyStyle },
    { no: 2, name: "title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "control", kind: "message", T: TabControl },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ReqUser
 */
export const ReqUser = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ReqUser",
  () => [
    { no: 1, name: "favorite", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "like", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "coin", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "fav_season", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "follow", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "dislike", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 7, name: "elec_plus_btn", kind: "message", T: Button },
    { no: 8, name: "charging_plus", kind: "message", T: ChargingPlus },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.Rights
 */
export const Rights = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.Rights",
  () => [
    { no: 1, name: "only_vip_download", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "no_reprint", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 3, name: "download", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ShowTime
 */
export const ShowTime = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ShowTime",
  () => [
    { no: 1, name: "start_time", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "end_time", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "pos_x", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 4, name: "pos_y", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.SimpleArc
 */
export const SimpleArc = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.SimpleArc",
  () => [
    { no: 1, name: "copyright", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.SimpleReqUser
 */
export const SimpleReqUser = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.SimpleReqUser",
  () => [
    { no: 1, name: "favorite", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "like", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "coin", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.StoryEntrance
 */
export const StoryEntrance = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.StoryEntrance",
  () => [
    { no: 1, name: "arc_play_story", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "story_icon", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "arc_landscape_story", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "landscape_icon", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "play_story", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.Tab
 */
export const Tab = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.Tab",
  () => [
    { no: 1, name: "tab_module", kind: "message", T: TabModule, repeated: true },
    { no: 2, name: "tab_bg", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "danmaku_entrance", kind: "message", T: TabControl },
  ],
);

/**
 * 评论区/弹幕 Tab 控制
 *
 * @generated from message bilibili.app.viewunite.v1.TabControl
 */
export const TabControl = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.TabControl",
  () => [
    { no: 1, name: "limit", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "disable", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 3, name: "disable_click_tip", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.TabModule
 */
export const TabModule = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.TabModule",
  () => [
    { no: 1, name: "tab_type", kind: "enum", T: proto3.getEnumType(TabType) },
    { no: 2, name: "introduction", kind: "message", T: IntroductionTab, oneof: "tab" },
    { no: 3, name: "reply", kind: "message", T: ReplyTab, oneof: "tab" },
    { no: 4, name: "activity_tab", kind: "message", T: ActivityTab, oneof: "tab" },
  ],
);

/**
 * UP主信息(可是Upper这个... 程序员英文不过关吧? )
 *
 * @generated from message bilibili.app.viewunite.v1.UpperInfos
 */
export const UpperInfos = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.UpperInfos",
  () => [
    { no: 1, name: "fans_count", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "arc_count_last_half_year", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "first_up_dates", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "total_play_count", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.VideoGuide
 */
export const VideoGuide = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.VideoGuide",
  () => [
    { no: 1, name: "material", kind: "message", T: Material, repeated: true },
    { no: 2, name: "video_point", kind: "message", T: VideoViewPoint },
    { no: 3, name: "contract_card", kind: "message", T: ContractCard },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.VideoPoint
 */
export const VideoPoint = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.VideoPoint",
  () => [
    { no: 1, name: "type", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "from", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "to", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "cover", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "logo_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.VideoShot
 */
export const VideoShot = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.VideoShot",
  () => [
    { no: 1, name: "pv_data", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "img_x_len", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "imd_x_size", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "img_y_len", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "img_y_size", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "image", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.VideoViewPoint
 */
export const VideoViewPoint = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.VideoViewPoint",
  () => [
    { no: 1, name: "points", kind: "message", T: VideoPoint, repeated: true },
    { no: 2, name: "point_material", kind: "message", T: PointMaterial },
    { no: 3, name: "point_permanent", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ViewBase
 */
export const ViewBase = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ViewBase",
  () => [
    { no: 1, name: "biz_type", kind: "enum", T: proto3.getEnumType(BizType) },
    { no: 2, name: "page_type", kind: "enum", T: proto3.getEnumType(PageType) },
    { no: 3, name: "control", kind: "message", T: PageControl },
    { no: 4, name: "activity_resource", kind: "message", T: ActivityResource },
    { no: 5, name: "config", kind: "message", T: Config },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ViewProgressReply
 */
export const ViewProgressReply = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ViewProgressReply",
  () => [
    { no: 1, name: "video_guide", kind: "message", T: VideoGuide },
    { no: 2, name: "chronos", kind: "message", T: Chronos },
    { no: 3, name: "arc_shot", kind: "message", T: VideoShot },
    { no: 4, name: "dm", kind: "message", T: DmResource },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ViewProgressReq
 */
export const ViewProgressReq = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ViewProgressReq",
  () => [
    { no: 1, name: "aid", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "cid", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "up_mid", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 4, name: "chronos_param", kind: "message", T: ChronosParam },
    { no: 5, name: "type", kind: "enum", T: proto3.getEnumType(UnionType) },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ViewReply
 */
export const ViewReply = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ViewReply",
  () => [
    { no: 1, name: "view_base", kind: "message", T: ViewBase },
    { no: 2, name: "arc", kind: "message", T: Arc },
    { no: 3, name: "req_user", kind: "message", T: ReqUser },
    { no: 4, name: "owner", kind: "message", T: Owner },
    { no: 5, name: "tab", kind: "message", T: Tab },
    { no: 6, name: "supplement", kind: "message", T: Any },
    { no: 7, name: "cm", kind: "message", T: CM },
    { no: 8, name: "ecode", kind: "enum", T: proto3.getEnumType(ECode) },
    { no: 9, name: "ecode_config", kind: "message", T: ECodeConfig },
    { no: 10, name: "report", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.viewunite.v1.ViewReq
 */
export const ViewReq = proto3.makeMessageType(
  "bilibili.app.viewunite.v1.ViewReq",
  () => [
    { no: 1, name: "aid", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "bvid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "from", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "spmid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "from_spmid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "session_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "player_args", kind: "message", T: PlayerArgs },
    { no: 8, name: "track_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "extra_content", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
    { no: 10, name: "play_mode", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 11, name: "relate", kind: "message", T: Relate },
    { no: 12, name: "biz_extra", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 13, name: "ad_extra", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

