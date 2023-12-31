// @generated by protoc-gen-connect-es v0.13.0 with parameter "target=js"
// @generated from file bilibili/app/dynamic/v2/dynamic.proto (package bilibili.app.dynamic.v2, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { AlumniDynamicsReply, AlumniDynamicsReq, CampusBillBoardReply, CampusBillBoardReq, CampusEntryTabReq, CampusEntryTabResp, CampusFeedbackReply, CampusFeedbackReq, CampusHomePagesReply, CampusHomePagesReq, CampusMateLikeListReply, CampusMateLikeListReq, CampusMngDetailReply, CampusMngDetailReq, CampusMngQuizOperateReply, CampusMngQuizOperateReq, CampusMngSubmitReply, CampusMngSubmitReq, CampusRcmdFeedReply, CampusRcmdFeedReq, CampusRcmdReply, CampusRcmdReq, CampusRecommendReply, CampusRecommendReq, CampusRedDotReply, CampusRedDotReq, CampusSquareReply, CampusSquareReq, CampusTopicRcmdFeedReply, CampusTopicRcmdFeedReq, DynAdditionCommonFollowReply, DynAdditionCommonFollowReq, DynAllPersonalReply, DynAllPersonalReq, DynAllReply, DynAllReq, DynAllUpdOffsetReq, DynDetailReply, DynDetailReq, DynDetailsReply, DynDetailsReq, DynFakeCardReply, DynFakeCardReq, DynFriendReply, DynFriendReq, DynLightReply, DynLightReq, DynMixUpListViewMoreReply, DynMixUpListViewMoreReq, DynRcmdReply, DynRcmdReq, DynRcmdUpExchangeReply, DynRcmdUpExchangeReq, DynSearchReply, DynSearchReq, DynServerDetailsReply, DynServerDetailsReq, DynSpaceReq, DynSpaceRsp, DynSpaceSearchDetailsReply, DynSpaceSearchDetailsReq, DynTabReply, DynTabReq, DynThumbReq, DynVideoPersonalReply, DynVideoPersonalReq, DynVideoReply, DynVideoReq, DynVideoUpdOffsetReq, DynVoteReply, DynVoteReq, FeedFilterReply, FeedFilterReq, FetchTabSettingReply, HomeSubscribeReply, HomeSubscribeReq, LbsPoiReply, LbsPoiReq, LegacyTopicFeedReply, LegacyTopicFeedReq, LikeListReply, LikeListReq, NoReply, NoReq, OfficialAccountsReply, OfficialAccountsReq, OfficialDynamicsReply, OfficialDynamicsReq, ReactionListReply, ReactionListReq, RepostListReq, RepostListRsp, SchoolRecommendReply, SchoolRecommendReq, SchoolSearchReply, SchoolSearchReq, SetDecisionReq, SetRecentCampusReq, SubscribeCampusReq, TopicListReply, TopicListReq, TopicSquareReply, TopicSquareReq, UnfollowMatchReq, UpdateTabSettingReq } from "./dynamic_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * v2动态, rpc 按字母顺序排列
 *
 * @generated from service bilibili.app.dynamic.v2.Dynamic
 */
export const Dynamic = {
  typeName: "bilibili.app.dynamic.v2.Dynamic",
  methods: {
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.AlumniDynamics
     */
    alumniDynamics: {
      name: "AlumniDynamics",
      I: AlumniDynamicsReq,
      O: AlumniDynamicsReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.CampusBillBoard
     */
    campusBillBoard: {
      name: "CampusBillBoard",
      I: CampusBillBoardReq,
      O: CampusBillBoardReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.CampusEntryTab
     */
    campusEntryTab: {
      name: "CampusEntryTab",
      I: CampusEntryTabReq,
      O: CampusEntryTabResp,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.CampusFeedback
     */
    campusFeedback: {
      name: "CampusFeedback",
      I: CampusFeedbackReq,
      O: CampusFeedbackReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.CampusHomePages
     */
    campusHomePages: {
      name: "CampusHomePages",
      I: CampusHomePagesReq,
      O: CampusHomePagesReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.CampusMateLikeList
     */
    campusMateLikeList: {
      name: "CampusMateLikeList",
      I: CampusMateLikeListReq,
      O: CampusMateLikeListReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.CampusMngDetail
     */
    campusMngDetail: {
      name: "CampusMngDetail",
      I: CampusMngDetailReq,
      O: CampusMngDetailReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.CampusMngQuizOperate
     */
    campusMngQuizOperate: {
      name: "CampusMngQuizOperate",
      I: CampusMngQuizOperateReq,
      O: CampusMngQuizOperateReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.CampusMngSubmit
     */
    campusMngSubmit: {
      name: "CampusMngSubmit",
      I: CampusMngSubmitReq,
      O: CampusMngSubmitReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.CampusRcmd
     */
    campusRcmd: {
      name: "CampusRcmd",
      I: CampusRcmdReq,
      O: CampusRcmdReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.CampusRcmdFeed
     */
    campusRcmdFeed: {
      name: "CampusRcmdFeed",
      I: CampusRcmdFeedReq,
      O: CampusRcmdFeedReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.CampusRecommend
     */
    campusRecommend: {
      name: "CampusRecommend",
      I: CampusRecommendReq,
      O: CampusRecommendReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.CampusRedDot
     */
    campusRedDot: {
      name: "CampusRedDot",
      I: CampusRedDotReq,
      O: CampusRedDotReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.CampusSquare
     */
    campusSquare: {
      name: "CampusSquare",
      I: CampusSquareReq,
      O: CampusSquareReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.CampusTopicRcmdFeed
     */
    campusTopicRcmdFeed: {
      name: "CampusTopicRcmdFeed",
      I: CampusTopicRcmdFeedReq,
      O: CampusTopicRcmdFeedReply,
      kind: MethodKind.Unary,
    },
    /**
     * 动态通用附加卡-follow/取消follow
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynAdditionCommonFollow
     */
    dynAdditionCommonFollow: {
      name: "DynAdditionCommonFollow",
      I: DynAdditionCommonFollowReq,
      O: DynAdditionCommonFollowReply,
      kind: MethodKind.Unary,
    },
    /**
     * 动态综合页
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynAll
     */
    dynAll: {
      name: "DynAll",
      I: DynAllReq,
      O: DynAllReply,
      kind: MethodKind.Unary,
    },
    /**
     * 综合页最近访问 - 个人feed流
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynAllPersonal
     */
    dynAllPersonal: {
      name: "DynAllPersonal",
      I: DynAllPersonalReq,
      O: DynAllPersonalReply,
      kind: MethodKind.Unary,
    },
    /**
     * 综合页最近访问 - 标记已读
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynAllUpdOffset
     */
    dynAllUpdOffset: {
      name: "DynAllUpdOffset",
      I: DynAllUpdOffsetReq,
      O: NoReply,
      kind: MethodKind.Unary,
    },
    /**
     * 动态详情页
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynDetail
     */
    dynDetail: {
      name: "DynDetail",
      I: DynDetailReq,
      O: DynDetailReply,
      kind: MethodKind.Unary,
    },
    /**
     * 批量动态id获取动态详情
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynDetails
     */
    dynDetails: {
      name: "DynDetails",
      I: DynDetailsReq,
      O: DynDetailsReply,
      kind: MethodKind.Unary,
    },
    /**
     * 动态发布生成临时卡
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynFakeCard
     */
    dynFakeCard: {
      name: "DynFakeCard",
      I: DynFakeCardReq,
      O: DynFakeCardReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynFriend
     */
    dynFriend: {
      name: "DynFriend",
      I: DynFriendReq,
      O: DynFriendReply,
      kind: MethodKind.Unary,
    },
    /**
     * 轻浏览
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynLight
     */
    dynLight: {
      name: "DynLight",
      I: DynLightReq,
      O: DynLightReply,
      kind: MethodKind.Unary,
    },
    /**
     * 网关调用 - 查看更多-列表
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynMixUpListViewMore
     */
    dynMixUpListViewMore: {
      name: "DynMixUpListViewMore",
      I: DynMixUpListViewMoreReq,
      O: DynMixUpListViewMoreReply,
      kind: MethodKind.Unary,
    },
    /**
     * 关注推荐up主换一换
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynRcmdUpExchange
     */
    dynRcmdUpExchange: {
      name: "DynRcmdUpExchange",
      I: DynRcmdUpExchangeReq,
      O: DynRcmdUpExchangeReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynSearch
     */
    dynSearch: {
      name: "DynSearch",
      I: DynSearchReq,
      O: DynSearchReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynServerDetails
     */
    dynServerDetails: {
      name: "DynServerDetails",
      I: DynServerDetailsReq,
      O: DynServerDetailsReply,
      kind: MethodKind.Unary,
    },
    /**
     * 空间页动态
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynSpace
     */
    dynSpace: {
      name: "DynSpace",
      I: DynSpaceReq,
      O: DynSpaceRsp,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynSpaceSearchDetails
     */
    dynSpaceSearchDetails: {
      name: "DynSpaceSearchDetails",
      I: DynSpaceSearchDetailsReq,
      O: DynSpaceSearchDetailsReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynTab
     */
    dynTab: {
      name: "DynTab",
      I: DynTabReq,
      O: DynTabReply,
      kind: MethodKind.Unary,
    },
    /**
     * 动态点赞
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynThumb
     */
    dynThumb: {
      name: "DynThumb",
      I: DynThumbReq,
      O: NoReply,
      kind: MethodKind.Unary,
    },
    /**
     * 未登录页分区UP主推荐
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynUnLoginRcmd
     */
    dynUnLoginRcmd: {
      name: "DynUnLoginRcmd",
      I: DynRcmdReq,
      O: DynRcmdReply,
      kind: MethodKind.Unary,
    },
    /**
     * 动态视频页
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynVideo
     */
    dynVideo: {
      name: "DynVideo",
      I: DynVideoReq,
      O: DynVideoReply,
      kind: MethodKind.Unary,
    },
    /**
     * 视频页最近访问 - 个人feed流
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynVideoPersonal
     */
    dynVideoPersonal: {
      name: "DynVideoPersonal",
      I: DynVideoPersonalReq,
      O: DynVideoPersonalReply,
      kind: MethodKind.Unary,
    },
    /**
     * 视频页最近访问 - 标记已读
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynVideoUpdOffset
     */
    dynVideoUpdOffset: {
      name: "DynVideoUpdOffset",
      I: DynVideoUpdOffsetReq,
      O: NoReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.DynVote
     */
    dynVote: {
      name: "DynVote",
      I: DynVoteReq,
      O: DynVoteReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.FeedFilter
     */
    feedFilter: {
      name: "FeedFilter",
      I: FeedFilterReq,
      O: FeedFilterReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.FetchTabSetting
     */
    fetchTabSetting: {
      name: "FetchTabSetting",
      I: NoReq,
      O: FetchTabSettingReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.HomeSubscribe
     */
    homeSubscribe: {
      name: "HomeSubscribe",
      I: HomeSubscribeReq,
      O: HomeSubscribeReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.LbsPoi
     */
    lbsPoi: {
      name: "LbsPoi",
      I: LbsPoiReq,
      O: LbsPoiReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.LegacyTopicFeed
     */
    legacyTopicFeed: {
      name: "LegacyTopicFeed",
      I: LegacyTopicFeedReq,
      O: LegacyTopicFeedReply,
      kind: MethodKind.Unary,
    },
    /**
     * 点赞列表
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.LikeList
     */
    likeList: {
      name: "LikeList",
      I: LikeListReq,
      O: LikeListReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.OfficialAccounts
     */
    officialAccounts: {
      name: "OfficialAccounts",
      I: OfficialAccountsReq,
      O: OfficialAccountsReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.OfficialDynamics
     */
    officialDynamics: {
      name: "OfficialDynamics",
      I: OfficialDynamicsReq,
      O: OfficialDynamicsReply,
      kind: MethodKind.Unary,
    },
    /**
     * 新版动态转发点赞列表 需要登录
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.ReactionList
     */
    reactionList: {
      name: "ReactionList",
      I: ReactionListReq,
      O: ReactionListReply,
      kind: MethodKind.Unary,
    },
    /**
     * 转发列表
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.RepostList
     */
    repostList: {
      name: "RepostList",
      I: RepostListReq,
      O: RepostListRsp,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.SchoolRecommend
     */
    schoolRecommend: {
      name: "SchoolRecommend",
      I: SchoolRecommendReq,
      O: SchoolRecommendReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.SchoolSearch
     */
    schoolSearch: {
      name: "SchoolSearch",
      I: SchoolSearchReq,
      O: SchoolSearchReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.SetDecision
     */
    setDecision: {
      name: "SetDecision",
      I: SetDecisionReq,
      O: NoReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.SetRecentCampus
     */
    setRecentCampus: {
      name: "SetRecentCampus",
      I: SetRecentCampusReq,
      O: NoReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.SubscribeCampus
     */
    subscribeCampus: {
      name: "SubscribeCampus",
      I: SubscribeCampusReq,
      O: NoReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.TopicList
     */
    topicList: {
      name: "TopicList",
      I: TopicListReq,
      O: TopicListReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.TopicSquare
     */
    topicSquare: {
      name: "TopicSquare",
      I: TopicSquareReq,
      O: TopicSquareReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.UnfollowMatch
     */
    unfollowMatch: {
      name: "UnfollowMatch",
      I: UnfollowMatchReq,
      O: NoReply,
      kind: MethodKind.Unary,
    },
    /**
     *
     *
     * @generated from rpc bilibili.app.dynamic.v2.Dynamic.UpdateTabSetting
     */
    updateTabSetting: {
      name: "UpdateTabSetting",
      I: UpdateTabSettingReq,
      O: NoReply,
      kind: MethodKind.Unary,
    },
  }
};

