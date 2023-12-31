// @generated by protoc-gen-es v1.3.1 with parameter "target=js"
// @generated from file bilibili/app/playeronline/v1/playeronline.proto (package bilibili.app.playeronline.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * 空回复
 *
 * @generated from message bilibili.app.playeronline.v1.NoReply
 */
export const NoReply = proto3.makeMessageType(
  "bilibili.app.playeronline.v1.NoReply",
  [],
);

/**
 * 获取在线人数-回复
 *
 * @generated from message bilibili.app.playeronline.v1.PlayerOnlineReply
 */
export const PlayerOnlineReply = proto3.makeMessageType(
  "bilibili.app.playeronline.v1.PlayerOnlineReply",
  () => [
    { no: 1, name: "total_text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "sec_next", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "bottom_show", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "sdm_show", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 5, name: "sdm_text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "total_number", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 7, name: "total_number_text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 获取在线人数-请求
 *
 * @generated from message bilibili.app.playeronline.v1.PlayerOnlineReq
 */
export const PlayerOnlineReq = proto3.makeMessageType(
  "bilibili.app.playeronline.v1.PlayerOnlineReq",
  () => [
    { no: 1, name: "aid", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "cid", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "play_open", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * @generated from message bilibili.app.playeronline.v1.PremiereInfoReply
 */
export const PremiereInfoReply = proto3.makeMessageType(
  "bilibili.app.playeronline.v1.PremiereInfoReply",
  () => [
    { no: 1, name: "premiere_over_text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "participant", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "interaction", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ],
);

/**
 * @generated from message bilibili.app.playeronline.v1.PremiereInfoReq
 */
export const PremiereInfoReq = proto3.makeMessageType(
  "bilibili.app.playeronline.v1.PremiereInfoReq",
  () => [
    { no: 1, name: "aid", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ],
);

/**
 * @generated from message bilibili.app.playeronline.v1.ReportWatchReq
 */
export const ReportWatchReq = proto3.makeMessageType(
  "bilibili.app.playeronline.v1.ReportWatchReq",
  () => [
    { no: 1, name: "aid", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "biz", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "buvid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

