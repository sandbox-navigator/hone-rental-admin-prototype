const platformMeta = {
  xianyu: { name: "闲鱼", tagClass: "blue" },
  meituan: { name: "美团", tagClass: "orange" },
  jd: { name: "京东", tagClass: "red" }
};

const conversations = [
  { id: 1, platform: "xianyu", name: "林先生", avatar: "林", color: "green", time: "刚刚", message: "可以，下午四点半左右到，地址发我。", unread: 2, state: "待人工", status: "在线 · 来自闲鱼", product: "iPhone 13 128G 星光色", scenario: "维修过渡机", trace: "AI 已识别闲鱼商品卡片，并读取设备档案 SN13-0821", warning: "高意向：明确租期并询问价格，建议给出租赁方案", messages: [
    ["buyer", "林", "这个 13 还在吗？电池多少，屏幕换过没有？", "10:24"],
    ["agent", "AI", "在的。这台是 iPhone 13 128G 星光色，电池健康 89%，原装屏，边框有轻微使用痕迹，门店已完成 38 项检测。您是想直接购买，还是短期过渡使用呢？", "AI 回复 · 10:24"],
    ["buyer", "林", "我的手机送修了，差不多用两三个月。租的话最低多少？", "10:25"],
    ["agent", "AI", "按您两三个月的过渡需求，更适合 3 个月短租：首期 299 元，之后每月 269 元，含基础保障。到期可以归还，也可以补差买断。您方便今天到店看一下机器吗？", "AI 回复 · 10:25"],
    ["buyer", "林", "可以，下午四点半左右到，地址发我。", "10:26"]
  ] },
  { id: 2, platform: "xianyu", name: "陈同学", avatar: "陈", color: "orange", time: "3 分钟", message: "学生租的话需要什么资料？", unread: 1, state: "AI接待", status: "在线 · 来自闲鱼", product: "iPhone 14 Pro 256G 暗紫色", scenario: "学生用机", trace: "AI 已读取租赁资料规则和设备档案 SN14P-0318", warning: "资料确认：涉及学生用户，建议人工确认监护信息", messages: [
    ["buyer", "陈", "学生租的话需要什么资料？", "10:28"],
    ["agent", "AI", "可以先看真实用机需求和预算。学生用机一般需要本人到店确认用途，具体资料以门店审核为准，我可以先帮您介绍这台机器的租赁方案。", "AI 回复 · 10:28"]
  ] },
  { id: 3, platform: "xianyu", name: "用户_8123", avatar: "8", color: "blue", time: "8 分钟", message: "屏幕有问题，我要退款。", unread: 1, state: "待人工", status: "离线 · 来自闲鱼", product: "iPhone 12 128G 白色", scenario: "售后退款", trace: "AI 命中投诉/退款强制转人工规则", warning: "高风险：停止自动回复，等待人工接管", messages: [
    ["buyer", "8", "屏幕有问题，我要退款。", "10:20"],
    ["agent", "AI", "这类售后和退款问题需要人工核实订单、检测记录和平台规则，我先为您转接门店人员处理。", "建议回复 · 未自动发送"]
  ] },
  { id: 4, platform: "xianyu", name: "Momo", avatar: "M", color: "orange", time: "1 小时", message: "能不能只看额度，机器不要？", unread: 2, state: "风险", status: "离线 · 来自闲鱼", product: "iPhone 13 128G 星光色", scenario: "疑似套现", trace: "AI 命中疑似套现和平台违规表达", warning: "高风险：不自动发送，虚拟电话提醒老板", messages: [
    ["buyer", "M", "能不能只看额度，机器不要？", "09:52"],
    ["agent", "AI", "未自动发送。该问题命中疑似套现风险，已转人工核验。", "系统记录 · 09:52"]
  ] },
  { id: 5, platform: "meituan", name: "周女士", avatar: "周", color: "green", time: "5 分钟", message: "美团上看到你们店，旧手机能抵吗？", unread: 1, state: "高意向", status: "在线 · 来自美团", product: "华为 Mate 50 256G 昆仑霞光", scenario: "到店置换", trace: "AI 已识别美团门店线索，并读取旧机抵扣规则", warning: "高意向：用户有到店置换意向，旧机估值需到店验机", messages: [
    ["buyer", "周", "美团上看到你们店，旧手机能抵吗？", "10:29"],
    ["agent", "AI", "可以做旧机抵扣，但最终价格需要到店检测后确认。您可以先发旧机型号、内存、成色和是否维修过，我先帮您预估区间。", "AI 回复 · 10:29"],
    ["buyer", "周", "我下班去店里看，可以发地址吗？", "10:30"]
  ] },
  { id: 6, platform: "jd", name: "刘先生", avatar: "刘", color: "blue", time: "14 分钟", message: "京东看到这台 14 Pro，支持租完买断吗？", unread: 0, state: "AI接待", status: "在线 · 来自京东", product: "iPhone 14 Pro 256G 暗紫色", scenario: "租赁买断", trace: "AI 已识别京东商品咨询，并读取租赁买断规则", warning: "价格需以设备档案和京东商品价一致为前提", messages: [
    ["buyer", "刘", "京东看到这台 14 Pro，支持租完买断吗？", "10:16"],
    ["agent", "AI", "支持到期后选择归还、续租或买断。买断价会按租期、设备状态和当时残值重新计算，具体以系统方案为准。", "AI 回复 · 10:16"]
  ] }
];

const products = [
  { id: "XY88120311", code: "SN13-0821", imei: "356421098212031", name: "iPhone 13 128G 星光色", brand: "Apple", note: "95新 · 电池89% · 原装屏", tone: "dark", store: "城南数码旗舰店", price: "¥3,299", rent: "首期299 / 月租269", stock: "1 台", completeness: 100, status: "在售", publishStatus: "可上架", materialStatus: "素材已生成", source: "门店回收", cost: "¥2,680", rentable: "可租", stats: "咨询 86 · 线索 19" },
  { id: "XY88120346", code: "SN14P-0318", imei: "358201146403182", name: "iPhone 14 Pro 256G 暗紫色", brand: "Apple", note: "9成新 · 电池86% · 原装屏", tone: "dark", store: "城南数码旗舰店", price: "¥5,199", rent: "首期399 / 月租359", stock: "2 台", completeness: 100, status: "在售", publishStatus: "待审核", materialStatus: "素材已生成", source: "供应链采购", cost: "¥4,420", rentable: "可租", stats: "咨询 63 · 线索 12" },
  { id: "XY77540219", code: "SNM50-1206", imei: "867142050120619", name: "华为 Mate 50 256G 昆仑霞光", brand: "华为", note: "95新 · 电池92% · 无拆修", tone: "gold", store: "万达手机快修", price: "¥3,599", rent: "首期299 / 月租289", stock: "1 台", completeness: 82, status: "在售", publishStatus: "待补素材", materialStatus: "待生成", source: "以旧换新", cost: "¥2,900", rentable: "可租", stats: "咨询 41 · 线索 8" },
  { id: "XY66310872", code: "SN12-0415", imei: "352780110415668", name: "iPhone 12 128G 白色", brand: "Apple", note: "9成新 · 电池84% · 更换电池", tone: "light", store: "青禾二手优品", price: "¥2,199", rent: "待配置租赁方案", stock: "3 台", completeness: 64, status: "草稿", publishStatus: "待补资料", materialStatus: "待生成", source: "门店回收", cost: "¥1,620", rentable: "待配置", stats: "咨询 0 · 线索 0" },
  { id: "XY55831092", code: "SNK60-0221", imei: "861082660221605", name: "Redmi K60 12+256G 墨羽", brand: "Redmi", note: "95新 · 电池95% · 无拆修", tone: "dark", store: "万达手机快修", price: "¥1,699", rent: "首期199 / 月租169", stock: "0 台", completeness: 100, status: "已下架", publishStatus: "上架失败", materialStatus: "素材已生成", source: "供应链采购", cost: "¥1,180", rentable: "不可租", stats: "咨询 28 · 线索 5" }
];

const knowledgeGaps = [
  { code: "SNM50-1206", missing: "维修史照片、售后承诺", impact: "成色说明、AI 客服、素材详情页", action: "建议人工确认", block: "阻断上架" },
  { code: "SN12-0415", missing: "租赁底价、买断价、电池更换凭证", impact: "租赁方案、议价、发布价格", action: "不承诺价格", block: "阻断上架" },
  { code: "SN12-0415", missing: "第 7 张标签图", impact: "闲鱼商品识别、AI 回复", action: "请求补图", block: "阻断上架" },
  { code: "SNK60-0221", missing: "可用库存", impact: "自动上下架、客服承诺", action: "停止承诺", block: "阻断上架" }
];

const publishTasks = [
  { no: "PUB20260803001", code: "SN13-0821", action: "发布到闲鱼", store: "城南数码旗舰店", check: "全部通过", state: "待发布", reason: "-" },
  { no: "PUB20260803002", code: "SN14P-0318", action: "发布到闲鱼", store: "城南数码旗舰店", check: "待人工审核", state: "需人工处理", reason: "素材已生成，但店长未确认" },
  { no: "PUB20260802019", code: "SNK60-0221", action: "重新上架", store: "万达手机快修", check: "库存失败", state: "上架失败", reason: "可用库存为 0，不能承诺在售" },
  { no: "PUB20260802011", code: "SNM50-1206", action: "发布到闲鱼", store: "万达手机快修", check: "知识缺失", state: "已拦截", reason: "缺少维修史照片和售后承诺" }
];

const templateCategories = {
  all: { title: "全部模板", desc: "覆盖价格、成色、发货、租赁和售后场景。" },
  price: { title: "价格与议价", desc: "处理询价、最低价、到店优惠和低于底价转人工。" },
  quality: { title: "成色与质检", desc: "解释成色、电池、屏幕、维修史和检测结论。" },
  delivery: { title: "发货与到店", desc: "处理发货时效、到店验机、自提预约和地址。" },
  rental: { title: "租赁与买断", desc: "解释首期、月租、租期、归还、买断和换机。" },
  service: { title: "售后与维修", desc: "说明保障范围、维修处理、退款投诉和纠纷转人工。" }
};

const messageTemplates = [
  { category: "price", tagClass: "blue", categoryName: "价格与议价", title: "询问最低价", body: "这台机器目前标价是 {{商品售价}}。如果您是到店自提，我可以根据门店当日活动再帮您确认；低于系统底价的优惠需要人工审核。", calls: 136 },
  { category: "price", tagClass: "blue", categoryName: "价格与议价", title: "旧机抵扣预估", body: "旧机可以抵扣，但最终价格需要到店检测后确认。您可以先发型号、内存、成色和是否维修过，我帮您预估区间。", calls: 92 },
  { category: "quality", tagClass: "green", categoryName: "成色与质检", title: "设备成色说明", body: "这台 {{商品型号}} 的成色等级是 {{成色等级}}，电池健康 {{电池健康}}，屏幕 {{屏幕情况}}，已完成门店 38 项检测。", calls: 78 },
  { category: "quality", tagClass: "green", categoryName: "成色与质检", title: "维修史说明", body: "维修记录以设备档案为准。如果买家继续追问主板、屏幕或电池维修情况，资料不完整时必须转人工确认。", calls: 46 },
  { category: "delivery", tagClass: "orange", categoryName: "发货与到店", title: "预约到店", body: "已为您预约 {{到店时间}} 到店看机，门店地址是 {{门店地址}}。到店后可现场验机，再决定购买或租赁方案。", calls: 61 },
  { category: "delivery", tagClass: "orange", categoryName: "发货与到店", title: "发货时效", body: "{{付款时间}} 前完成下单可当天发货；超过发货时间会顺延到下一个工作日。发货前会再次核对设备串码和库存。", calls: 58 },
  { category: "rental", tagClass: "purple", categoryName: "租赁与买断", title: "短期租赁方案", body: "如果您是短期过渡使用，可以选择 {{租期}} 方案：首期 {{首期金额}}，月租 {{月租金额}}，到期可归还或按届时买断价购买。", calls: 89 },
  { category: "rental", tagClass: "purple", categoryName: "租赁与买断", title: "到期买断说明", body: "到期后可选择归还、续租或买断。买断价会按租期、设备状态和当时残值重新计算，具体以系统方案为准。", calls: 52 },
  { category: "service", tagClass: "red", categoryName: "售后与维修", title: "售后保障范围", body: "门店提供 90 天基础保障。非人为故障可检测处理；进水、摔坏、私拆、屏幕人为损坏等需按检测结果确认。", calls: 74 },
  { category: "service", tagClass: "red", categoryName: "售后与维修", title: "投诉退款转人工", body: "遇到投诉、退款、平台介入、赔偿、纠纷等问题，AI 不自动承诺处理结果，立即转人工接管。", calls: 33 }
];

const strategyTemplates = {
  rental: {
    name: "二手手机真实使用型租赁",
    tag: "当前推荐",
    storeType: "综合服务店 / 高活跃维修店",
    status: "已发布",
    applied: "624 家门店",
    role: "你是二手手机门店的专业接待助手，只围绕真实用机需求回复。优先解释验机、成色、租赁、买断、售后和到店服务，不使用额度、变现、好通过等表达。",
    boundary: "不承诺未核实库存、不承诺最终旧机抵扣价、不承诺平台规则外服务。遇到价格冲突、投诉退款、疑似套现、商品识别失败时停止自动发送并转人工。",
    qa: "价格与议价、成色与质检、租赁与买断、售后与维修",
    knowledge: "强制读取当前咨询商品绑定的设备知识包：串码、IMEI、品牌型号、颜色容量、成色、电池、屏幕、维修史、来源、售价、租金、首付、买断价、库存状态、售后承诺。",
    rules: ["投诉 / 退款 / 纠纷", "库存不确定", "价格冲突或低于底价", "商品识别失败", "疑似套现", "平台违规词"],
    model: "Doubao-Seed-2.0-lite",
    temp: "0.3",
    token: "512",
    prompt: "phone-rental-v12",
    scope: "二三线城市样板门店、已有闲鱼经营门店"
  },
  repair: {
    name: "维修小店短租过渡方案",
    tag: "维修过渡",
    storeType: "维修小店",
    status: "灰度中",
    applied: "318 家门店",
    role: "你是维修门店的备用机租赁接待助手，先判断用户是否因维修周期、备用机、学生机或短期工作机产生真实用机需求。",
    boundary: "维修周期和备用机库存不确定时不自动承诺；涉及原机维修报价、赔偿、退款、维修争议时转人工。",
    qa: "发货与到店、租赁与买断、售后与维修",
    knowledge: "读取维修工单、备用机设备档案、短租价格、押金/首期规则、归还检查规则和门店营业时间。",
    rules: ["维修争议", "备用机库存不确定", "归还规则不清", "短租低于底价", "投诉退款"],
    model: "Doubao-Seed-2.0-lite",
    temp: "0.2",
    token: "512",
    prompt: "repair-rental-v5",
    scope: "维修类小店、仅短租过渡场景"
  },
  combo: {
    name: "买/租/修/换综合接待",
    tag: "综合服务店",
    storeType: "综合服务店 / 卖场型门店",
    status: "已发布",
    applied: "492 家门店",
    role: "你是门店手机使用方案顾问，根据用户预算、旧机情况、目标机型和使用周期，生成买、租、修、换、旧机抵扣的对比建议。",
    boundary: "旧机抵扣只给预估区间；租赁方案需读取设备档案和租赁策略；用户只关心额度或变现时转人工核验。",
    qa: "价格与议价、成色与质检、发货与到店、租赁与买断、售后与维修",
    knowledge: "读取用户线索、设备档案、库存、租赁策略、旧机估值规则、售后规则和历史订单。",
    rules: ["旧机估值不确定", "价格冲突", "库存不确定", "疑似套现", "平台违规词", "投诉退款"],
    model: "Doubao-Seed-2.0-lite",
    temp: "0.3",
    token: "1024",
    prompt: "phone-solution-v8",
    scope: "可提供买卖、租赁、维修、回收置换的综合门店"
  }
};

const orders = [
  { no: "XY202608010089", time: "今天 09:42", buyer: "林女士", phone: "iPhone 14 Pro 256G", code: "SN14P-0281", type: "租赁订单", amount: "首期 ¥399", status: "待发货", term: "12 期 · 2027/07/31", source: "闲鱼" },
  { no: "XY202608010076", time: "今天 08:57", buyer: "周先生", phone: "iPhone 13 128G", code: "SN13-0712", type: "销售订单", amount: "¥3,199", status: "待发货", term: "-", source: "闲鱼" },
  { no: "MD202607310128", time: "昨天 18:22", buyer: "赵女士", phone: "华为 Mate 50 256G", code: "SNM50-1182", type: "到店订单", amount: "¥2,280", status: "已完成", term: "旧机抵扣 ¥1,200", source: "门店" },
  { no: "XY202605120033", time: "2026/05/12", buyer: "陈同学", phone: "iPhone 13 128G", code: "SN13-0528", type: "租赁订单", amount: "月租 ¥269", status: "租赁中", term: "3 期 · 还剩 18 天", source: "闲鱼" },
  { no: "MD202602080019", time: "2026/02/08", buyer: "黄先生", phone: "iPhone 14 128G", code: "SN14-0109", type: "租赁订单", amount: "月租 ¥329", status: "即将到期", term: "6 期 · 还剩 4 天", source: "门店" }
];

const drawer = document.getElementById("drawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");
const modalBackdrop = document.getElementById("modalBackdrop");
const toast = document.getElementById("toast");
let currentRole = "store";
let activeImPlatform = "xianyu";

function initIcons() {
  if (window.lucide) window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
}

function showToast(message) {
  toast.querySelector("span").textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2300);
}

function closeFloating() {
  document.querySelectorAll(".popover.open, .notification-panel.open").forEach(el => el.classList.remove("open"));
}

function updateRoleChrome(isOps) {
  const roleSwitch = document.getElementById("roleSwitch");
  const profileBtn = document.getElementById("profileBtn");
  roleSwitch.classList.toggle("ops", isOps);
  roleSwitch.querySelector("span").textContent = isOps ? "平台运营端" : "门店老板端";
  profileBtn.querySelector(".avatar").textContent = isOps ? "运" : "王";
  profileBtn.querySelector("span:not(.avatar)").textContent = isOps ? "平台运营" : "王店长";
}

function navigate(pageName) {
  document.querySelectorAll(".page").forEach(page => page.classList.toggle("active", page.dataset.page === pageName));
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.nav === pageName));
  currentRole = pageName === "ops" ? "ops" : "store";
  updateRoleChrome(currentRole === "ops");
  closeFloating();
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (pageName === "im") setTimeout(() => { const messages = document.getElementById("messages"); messages.scrollTop = messages.scrollHeight; }, 50);
}

function setRole(role) {
  currentRole = role;
  const isOps = role === "ops";
  updateRoleChrome(isOps);
  navigate(isOps ? "ops" : "dashboard");
  showToast(isOps ? "已切换到平台运营端，可管理模型、规则和审计" : "已切换到门店老板端，仅保留业务配置");
}

function renderChat(data = conversations[0]) {
  const platform = platformMeta[data.platform];
  document.getElementById("chatBuyer").textContent = data.name;
  document.getElementById("chatAvatar").textContent = data.avatar;
  document.getElementById("chatAvatar").className = `avatar ${data.color}`;
  document.getElementById("chatStatus").textContent = data.status;
  document.getElementById("contextProduct").textContent = data.product;
  document.getElementById("contextScenario").textContent = data.scenario;
  const stateTag = document.getElementById("platformStateTag");
  stateTag.textContent = `${platform.name} · AI 接待中`;
  stateTag.className = `tag ${platform.tagClass}`;
  document.getElementById("messages").innerHTML = `<div class="time-separator">今天</div>
    <div class="ai-trace"><i data-lucide="sparkles"></i>${data.trace}</div>
    ${data.messages.map(([type, avatar, text, time]) => `<div class="message ${type}"><span class="avatar ${type === "agent" ? "ai" : data.color}">${type === "agent" ? `<i data-lucide="bot"></i>` : avatar}</span><div><p>${text}</p><small>${time}</small></div></div>`).join("")}
    <div class="ai-trace warning"><i data-lucide="circle-alert"></i>${data.warning}</div>`;
  initIcons();
  const messages = document.getElementById("messages");
  messages.scrollTop = messages.scrollHeight;
}

function renderConversations(filter = "") {
  const list = document.getElementById("conversationList");
  const visible = conversations.filter(item => item.platform === activeImPlatform && (item.name.toLowerCase().includes(filter.toLowerCase()) || item.message.includes(filter) || item.product.includes(filter)));
  list.innerHTML = visible.length ? visible.map((item, index) => `
    <button class="conversation-item ${index === 0 ? "active" : ""}" data-conversation="${item.id}">
      <span class="avatar ${item.color}">${item.avatar}</span>
      <span class="conversation-info"><span><b>${item.name}</b><small>${platformMeta[item.platform].name} · ${item.time}</small></span><p>${item.message}</p></span>
      <span class="conversation-meta">${item.unread ? `<b class="count">${item.unread}</b>` : ""}<small class="mini-state">${item.state}</small></span>
    </button>`).join("") : `<div class="conversation-empty"><i data-lucide="message-square-off"></i><b>暂无${platformMeta[activeImPlatform].name}会话</b><small>可切换其他平台，或等待新咨询同步。</small></div>`;
  const first = visible[0];
  if (first) renderChat(first);
  initIcons();
}

function renderProducts(filter = "") {
  const rows = document.getElementById("productRows");
  rows.innerHTML = products.filter(product => [product.name, product.id, product.code].some(value => value.toLowerCase().includes(filter.toLowerCase()))).map(product => {
    const knowledgeClass = product.completeness < 100 ? "warn" : "";
    const statusClass = product.status === "在售" ? "green" : product.status === "草稿" ? "orange" : "blue";
    const publishClass = product.publishStatus === "可上架" ? "green" : product.publishStatus === "待审核" ? "blue" : product.publishStatus === "上架失败" || product.publishStatus === "待补资料" ? "red" : "orange";
    return `<tr>
      <td><input type="checkbox"></td>
      <td><div class="product-cell"><div class="phone-thumb ${product.tone}"><span></span></div><span><b>${product.name}</b><small>商品ID ${product.id} · 设备 ${product.code}</small><small>${product.note}</small></span></div></td>
      <td>${product.store}</td><td><div class="price-stack"><b>${product.price}</b><small>${product.rent}</small></div></td><td>${product.stock}</td>
      <td><div class="progress-label ${knowledgeClass}"><span><i style="width:${product.completeness}%"></i></span><b>${product.completeness}%</b></div></td>
      <td><span class="tag ${publishClass}">${product.publishStatus}</span></td><td><span class="tag ${statusClass}">${product.status}</span></td><td>${product.stats}</td>
      <td><div class="row-actions"><button class="link-btn" data-product="${product.code}">详情</button><button class="link-btn" data-material="${product.code}">素材</button><button class="link-btn" data-publish-product="${product.code}">发布</button></div></td>
    </tr>`;
  }).join("");
  initIcons();
}

function renderDevices() {
  document.getElementById("deviceRows").innerHTML = products.map(product => {
    const screen = product.note.split(" · ")[2] || "待核验";
    const condition = product.note.split(" · ")[0];
    const battery = product.note.match(/电池\d+%/)?.[0] || "电池待补";
    const rentClass = product.rentable === "可租" ? "green" : product.rentable === "待配置" ? "orange" : "red";
    return `<tr><td><div class="product-cell"><div class="phone-thumb ${product.tone}"><span></span></div><span><b>${product.name}</b><small>设备 ${product.code}</small></span></div></td><td>${product.imei}</td><td>${condition} / ${battery}</td><td>${screen} / ${product.note.includes("无拆修") ? "无拆修" : "有记录"}</td><td>${product.source} / ${product.cost}</td><td>${product.stock}</td><td><span class="tag ${rentClass}">${product.rentable}</span></td><td><div class="progress-label ${product.completeness < 100 ? "warn" : ""}"><span><i style="width:${product.completeness}%"></i></span><b>${product.completeness}%</b></div></td><td><button class="link-btn" data-product="${product.code}">详情</button></td></tr>`;
  }).join("");
  initIcons();
}

function renderKnowledgeGaps() {
  document.getElementById("knowledgeRows").innerHTML = knowledgeGaps.map(item => {
    const product = products.find(product => product.code === item.code) || products[0];
    return `<tr><td><div><b>${product.name}</b><small style="display:block;color:#667085;margin-top:3px">${item.code}</small></div></td><td>${item.missing}</td><td>${item.impact}</td><td><span class="tag blue">${item.action}</span></td><td><span class="tag red">${item.block}</span></td><td><button class="link-btn" data-product="${item.code}">补充</button></td></tr>`;
  }).join("");
}

function renderPublishTasks() {
  document.getElementById("publishRows").innerHTML = publishTasks.map(task => {
    const product = products.find(product => product.code === task.code) || products[0];
    const stateClass = task.state === "待发布" ? "blue" : task.state === "发布中" ? "orange" : task.state === "上架失败" || task.state === "已拦截" ? "red" : "green";
    const checkClass = task.check === "全部通过" ? "green" : "orange";
    return `<tr><td><b>${task.no}</b><small style="display:block;color:#667085;margin-top:3px">${task.action}</small></td><td>${product.name}<small style="display:block;color:#667085;margin-top:3px">${task.code}</small></td><td>${task.store}</td><td><span class="tag ${checkClass}">${task.check}</span></td><td><span class="tag ${stateClass}">${task.state}</span></td><td>${task.reason}</td><td><div class="row-actions"><button class="link-btn" data-material="${task.code}">查看素材</button><button class="link-btn" data-publish-product="${task.code}">重试</button></div></td></tr>`;
  }).join("");
}

function renderTemplates(category = "all", filter = "") {
  const meta = templateCategories[category] || templateCategories.all;
  document.getElementById("templatePanelTitle").textContent = meta.title;
  document.getElementById("templatePanelDesc").textContent = meta.desc;
  const keyword = filter.trim().toLowerCase();
  const visibleTemplates = messageTemplates.filter(template => {
    const matchCategory = category === "all" || template.category === category;
    const matchKeyword = !keyword || [template.title, template.body, template.categoryName].some(value => value.toLowerCase().includes(keyword));
    return matchCategory && matchKeyword;
  });
  document.getElementById("templateGrid").innerHTML = visibleTemplates.length ? visibleTemplates.map(template => `
    <article class="template-card">
      <div><span class="tag ${template.tagClass}">${template.categoryName}</span><button class="icon-btn plain" title="更多"><i data-lucide="ellipsis"></i></button></div>
      <h3>${template.title}</h3>
      <p>${template.body}</p>
      <footer><span>近 7 日调用 ${template.calls} 次</span><button class="link-btn" data-action="edit-template">编辑</button></footer>
    </article>`).join("") : `<section class="empty-state compact"><i data-lucide="search-x"></i><h2>没有匹配的模板</h2><p>请更换关键词，或新建一条模板。</p><button class="btn primary" data-action="new-template"><i data-lucide="plus"></i>新建模板</button></section>`;
  initIcons();
}

function renderOrders() {
  document.getElementById("orderRows").innerHTML = orders.map(order => {
    const statusClass = order.status === "已完成" || order.status === "租赁中" ? "green" : order.status === "即将到期" ? "orange" : "blue";
    const typeClass = order.type === "租赁订单" ? "purple" : order.type === "到店订单" ? "green" : "blue";
    return `<tr><td><b>${order.no}</b><small style="display:block;color:#98a2b3;margin-top:3px">${order.time}</small></td><td>${order.buyer}</td><td><div><b>${order.phone}</b><small style="display:block;color:#667085;margin-top:3px">${order.code}</small></div></td><td><span class="tag ${typeClass}">${order.type}</span></td><td><b>${order.amount}</b></td><td><span class="tag ${statusClass}">${order.status}</span></td><td>${order.term}</td><td>${order.source}</td><td><button class="link-btn" data-order="${order.no}">详情</button></td></tr>`;
  }).join("");
}

function renderChart() {
  const data = [
    [42,5,"19"],[48,7,"20"],[36,4,"21"],[51,8,"22"],[57,9,"23"],[49,6,"24"],[62,10,"25"],
    [54,8,"26"],[68,12,"27"],[71,11,"28"],[65,9,"29"],[79,13,"30"],[74,12,"31"],[86,16,"01"]
  ];
  const max = 90;
  document.getElementById("barChart").innerHTML = data.map(([lead, order, day]) => `<div class="bar-group"><i style="height:${lead/max*100}%" title="有效线索 ${lead}"></i><i style="height:${order/max*100}%" title="成交 ${order}"></i><span>${day}</span></div>`).join("");
}

function openDrawer({ eyebrow = "详情", title = "", body = "", saveLabel = "保存更新", wide = false }) {
  document.getElementById("drawerEyebrow").textContent = eyebrow;
  document.getElementById("drawerTitle").textContent = title;
  document.getElementById("drawerBody").innerHTML = body;
  drawer.querySelector("footer .primary").innerHTML = `<i data-lucide="save"></i>${saveLabel}`;
  drawer.classList.toggle("wide", wide);
  drawer.classList.add("open");
  drawerBackdrop.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  initIcons();
}

function closeDrawer() {
  drawer.classList.remove("open");
  drawerBackdrop.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

function productDrawer(product = products[0]) {
  openDrawer({
    eyebrow: "商品与设备档案",
    title: product.name,
    body: `<div class="drawer-tabs"><button class="active">基础信息</button><button>设备档案</button><button>租赁方案</button><button>AI 知识</button><button>发布记录</button></div>
      <div class="detail-hero"><div class="phone-thumb ${product.tone}"><span></span></div><div><span class="tag ${product.status === "在售" ? "green" : "orange"}">${product.status}</span><h3>${product.name}</h3><p>闲鱼商品 ${product.id} · 绑定设备 ${product.code}</p></div></div>
      <section class="form-section"><h3>发布准备度</h3><div class="readiness-grid"><span class="${product.completeness === 100 ? "ok" : "warn"}"><i data-lucide="${product.completeness === 100 ? "check" : "circle-alert"}"></i>设备信息 ${product.completeness}%</span><span class="${product.materialStatus === "素材已生成" ? "ok" : "warn"}"><i data-lucide="${product.materialStatus === "素材已生成" ? "check" : "circle-alert"}"></i>${product.materialStatus}</span><span class="${product.stock !== "0 台" ? "ok" : "bad"}"><i data-lucide="${product.stock !== "0 台" ? "check" : "x"}"></i>库存 ${product.stock}</span><span class="${product.publishStatus === "可上架" ? "ok" : "warn"}"><i data-lucide="${product.publishStatus === "可上架" ? "check" : "circle-alert"}"></i>${product.publishStatus}</span><span class="ok"><i data-lucide="shield-check"></i>平台规则已校验</span></div></section>
      <section class="form-section"><h3>商品信息</h3><div class="form-grid"><label>商品标题<input value="${product.name}｜38项检测｜门店可验机"></label><label>闲鱼售价<input value="${product.price.replace("¥", "")}"></label><label>所属店铺<select><option>${product.store}</option></select></label><label>可用库存<input value="${product.stock.replace(" 台", "")}"></label></div></section>
      <section class="form-section"><h3>设备档案</h3><div class="form-grid"><label>设备串码<input value="${product.code}"></label><label>IMEI<input value="35 642109 82•••• 1"></label><label>成色等级<select><option>${product.note.split(" · ")[0]}</option></select></label><label>电池健康<input value="${product.note.match(/电池\d+%/)?.[0].replace("电池","") || "待补充"}"></label><label>屏幕情况<select><option>${product.note.split(" · ")[2] || "待核验"}</option></select></label><label>维修记录<select><option>无主板维修记录</option></select></label></div></section>
      <section class="form-section"><h3>租赁与买断</h3><div class="form-grid"><label>首期金额<input value="${product.rent.includes("首期") ? product.rent.split(" / ")[0].replace("首期","") : "待配置"}"></label><label>月租金额<input value="${product.rent.includes("月租") ? product.rent.split("月租")[1] : "待配置"}"></label><label>默认租期<select><option>3 个月</option><option>6 个月</option><option>12 个月</option></select></label><label>预计买断价<input value="2899"></label></div></section>
      <div class="drawer-note"><i data-lucide="triangle-alert"></i><span>商品、设备档案与租赁方案会共同供 AI 接待读取。价格或库存发生冲突时，系统会停止自动承诺并转人工。</span></div>`
  });
}

function orderDrawer(order = orders[0]) {
  openDrawer({
    eyebrow: order.type,
    title: order.no,
    saveLabel: order.status === "待发货" ? "确认发货" : "保存备注",
    body: `<div class="detail-hero"><div class="phone-thumb dark"><span></span></div><div><span class="tag ${order.status === "待发货" ? "blue" : "green"}">${order.status}</span><h3>${order.phone}</h3><p>设备 ${order.code} · 买家 ${order.buyer}</p></div></div>
      <section class="form-section"><h3>订单信息</h3><dl class="device-facts"><div><dt>订单类型</dt><dd>${order.type}</dd></div><div><dt>订单金额</dt><dd><b>${order.amount}</b></dd></div><div><dt>订单来源</dt><dd>${order.source}</dd></div><div><dt>下单时间</dt><dd>${order.time}</dd></div></dl></section>
      <section class="form-section"><h3>履约信息</h3><div class="form-grid"><label>履约方式<select><option>${order.source === "门店" ? "到店交付" : "快递发货"}</option></select></label><label>当前状态<select><option>${order.status}</option></select></label><label class="span-2">收货/到店信息<input value="广东省东莞市南城区万达广场附近"></label>${order.type === "租赁订单" ? `<label>租期<input value="${order.term.split(" · ")[0]}"></label><label>到期信息<input value="${order.term.split(" · ")[1] || ""}"></label>` : ""}</div></section>
      <section class="form-section"><h3>生命周期动作</h3><div class="row-actions"><button class="btn secondary small">发起维修</button><button class="btn secondary small">生成续租方案</button><button class="btn secondary small">计算买断价</button><button class="btn secondary small">升级换机</button></div></section>
      <section class="form-section"><label>门店备注<textarea rows="4" placeholder="记录用户承诺、验机情况和后续跟进"></textarea></label></section>`
  });
}

function planDrawer() {
  openDrawer({
    eyebrow: "方案工作台",
    title: "新建手机使用方案",
    saveLabel: "生成方案",
    body: `<div class="drawer-note" style="margin-bottom:18px"><i data-lucide="sparkles"></i><span>先记录真实使用需求，再比较购买、租赁、维修和旧机置换。方案生成后可发送到闲鱼会话并沉淀为线索。</span></div>
      <section class="form-section"><h3>用户需求</h3><div class="form-grid"><label>用户称呼<input value="林先生"></label><label>来源<select><option>闲鱼咨询</option><option>门店到访</option></select></label><label>使用场景<select><option>维修期间过渡</option><option>学生用机</option><option>工作备用机</option><option>预算型换机</option></select></label><label>预计使用时长<select><option>2-3 个月</option><option>6 个月</option><option>12 个月</option></select></label><label>月度预算<input value="300"></label><label>旧机情况<select><option>暂无旧机抵扣</option><option>有旧机待估价</option></select></label></div></section>
      <section class="form-section"><h3>目标设备</h3><div class="form-grid"><label class="span-2">选择在库设备<select><option>iPhone 13 128G 星光色 · SN13-0821 · 可租1台</option><option>iPhone 14 Pro 256G 暗紫色 · 可租2台</option></select></label></div></section>
      <section class="form-section"><h3>推荐方案</h3><div class="plan-options"><label class="plan-option selected"><input type="radio" checked name="plan"><span><b>3 个月短租过渡</b><small>首期 ¥299 + 月租 ¥269，到期归还或买断</small></span><strong>推荐</strong></label><label class="plan-option"><input type="radio" name="plan"><span><b>直接购买二手机</b><small>一次性 ¥3,299，含 90 天门店保障</small></span></label><label class="plan-option"><input type="radio" name="plan"><span><b>维修原手机 + 备用机服务</b><small>先检测原机，根据维修周期安排备用机</small></span></label></div></section>`
  });
}

function templateDrawer() {
  openDrawer({
    eyebrow: "消息模板",
    title: "编辑：询问最低价",
    body: `<section class="form-section"><div class="form-grid"><label>模板名称<input value="询问最低价"></label><label>模板分类<select><option>价格与议价</option></select></label><label class="span-2">触发关键词<input value="最低、便宜、优惠、少点、到手价"></label></div></section><section class="form-section"><label>回复模板<textarea rows="8">这台机器目前标价是 {{商品售价}}。如果您是到店自提，我可以根据门店当日活动再帮您确认；低于系统底价的优惠需要人工审核。</textarea></label></section><section class="form-section"><h3>可用动态字段</h3><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:9px"><span class="tag blue">{{商品售价}}</span><span class="tag blue">{{月租金额}}</span><span class="tag blue">{{首期金额}}</span><span class="tag blue">{{店铺地址}}</span><span class="tag blue">{{电池健康}}</span></div></section><div class="drawer-note"><i data-lucide="shield-check"></i><span>当实时价格低于店铺底价或商品价格与设备档案冲突时，本模板不会自动发送。</span></div>`
  });
}

function opsTemplateDrawer(templateId = "new") {
  const isNew = templateId === "new";
  const template = strategyTemplates[templateId] || {
    name: "新建 AI 策略模板",
    tag: "草稿",
    storeType: "二手手机租赁接待模板",
    status: "草稿",
    applied: "未应用",
    role: "你是二手手机门店的专业接待助手，只围绕真实用机需求回复。",
    boundary: "不承诺未核实库存、未核实价格、未核实售后结果；命中高风险规则时转人工。",
    qa: "价格与议价、成色与质检、租赁与买断",
    knowledge: "强制读取当前商品绑定的设备知识包，缺失关键字段时不自动回复。",
    rules: ["投诉 / 退款 / 纠纷", "库存不确定", "价格冲突或低于底价", "商品识别失败", "疑似套现", "平台违规词"],
    model: "Doubao-Seed-2.0-lite",
    temp: "0.3",
    token: "512",
    prompt: "phone-rental-v12",
    scope: "选择门店后发布"
  };
  openDrawer({
    eyebrow: "平台运营后台 · AI 策略模板",
    title: isNew ? "新增模板：二手手机租赁接待" : `编辑：${template.name}`,
    saveLabel: "保存草稿",
    wide: true,
    body: `<div class="drawer-note" style="margin-bottom:18px"><i data-lucide="lock-keyhole"></i><span>该编辑器仅平台运营可见。门店老板端不会暴露 Prompt、模型、Temperature、Token 和底层风险规则。</span></div>
      <section class="form-section"><h3>基础信息</h3><div class="form-grid"><label>模板名称<input value="${template.name}"></label><label>适用门店类型<input value="${template.storeType}"></label><label>启用状态<select><option>${template.status}</option><option>草稿</option><option>灰度中</option><option>已发布</option><option>停用</option></select></label><label>应用范围<input value="${template.scope}"></label><label>当前应用<input value="${template.applied}"></label><label>模板标签<input value="${template.tag}"></label></div></section>
      <section class="form-section"><h3>角色设定与回复边界</h3><label>System Prompt / 角色设定<textarea rows="5">${template.role}</textarea></label><label style="margin-top:10px">强制回复边界<textarea rows="5">${template.boundary}</textarea></label></section>
      <section class="form-section"><h3>Q&A 模板与设备知识依赖</h3><div class="form-grid"><label class="span-2">引用 Q&A 模板分类<input value="${template.qa}"></label><label class="span-2">设备知识包读取策略<textarea rows="5">${template.knowledge}</textarea></label></div><div class="source-grid" style="margin-top:10px"><span>绑定字段<b>串码 / IMEI / 商品ID</b></span><span>设备事实<b>型号、成色、电池、屏幕、维修史</b></span><span>交易事实<b>售价、首付、月租、买断价、库存</b></span><span>服务事实<b>发货、售后、门店地址、营业时间</b></span></div></section>
      <section class="form-section"><h3>强制转人工规则</h3><div class="rule-check-grid">${template.rules.map(rule => `<label><input type="checkbox" checked disabled><span>${rule}</span><b>锁定</b></label>`).join("")}</div></section>
      <section class="form-section"><h3>模型与调用参数</h3><div class="param-grid"><label>当前模型<select><option>${template.model}</option><option>GPT-5-mini · 灰度评估</option></select></label><label>Temperature<input value="${template.temp}"></label><label>最大 Token<select><option>${template.token}</option><option>1024</option></select></label><label>Prompt 版本<input value="${template.prompt}"></label><label>回复延时<input value="3 秒"></label><label>会话冷却<input value="10 秒"></label></div></section>
      <section class="form-section"><h3>测试回复</h3><div class="ops-test-card"><p><b>模拟买家：</b>只看额度，机器不要，能不能秒下？</p><p><b>读取数据：</b>风险词库、租赁合规规则、当前设备知识包</p><p><b>命中规则：</b>疑似套现 + 平台违规表达</p><p><b>AI 动作：</b><span class="tag red">转人工，不自动发送</span></p><div class="row-actions"><button class="btn secondary small" data-action="test-ai-reply"><i data-lucide="message-square-text"></i>测试回复</button><button class="btn primary small" data-action="publish-template"><i data-lucide="send"></i>发布模板</button></div></div></section>`
  });
}

function materialDrawer(product = products[0]) {
  const blocked = product.completeness < 100 || product.stock === "0 台";
  const gaps = knowledgeGaps.filter(item => item.code === product.code);
  openDrawer({
    eyebrow: "发布素材工作台",
    title: product.name,
    saveLabel: blocked ? "补充资料后再审核" : "提交审核",
    body: `<div class="drawer-note" style="margin-bottom:18px"><i data-lucide="shield-check"></i><span>发布到闲鱼前，必须完成设备档案、AI 素材、价格/库存校验和人工审阅。未确认的内容不会自动发布。</span></div>
      <section class="form-section"><h3>发布前置校验</h3><div class="publish-checks"><span class="${product.completeness === 100 ? "ok" : "bad"}"><i data-lucide="${product.completeness === 100 ? "check" : "x"}"></i>设备档案 ${product.completeness}%</span><span class="${product.materialStatus === "素材已生成" ? "ok" : "warn"}"><i data-lucide="${product.materialStatus === "素材已生成" ? "check" : "circle-alert"}"></i>${product.materialStatus}</span><span class="${product.stock !== "0 台" ? "ok" : "bad"}"><i data-lucide="${product.stock !== "0 台" ? "check" : "x"}"></i>库存 ${product.stock}</span><span class="ok"><i data-lucide="shield-check"></i>敏感词通过</span><span class="${product.publishStatus === "可上架" ? "ok" : "warn"}"><i data-lucide="${product.publishStatus === "可上架" ? "check" : "circle-alert"}"></i>${product.publishStatus}</span></div></section>
      ${gaps.length ? `<section class="form-section"><h3>阻断项</h3><div class="block-list">${gaps.map(item => `<div><b>${item.missing}</b><small>${item.impact} · ${item.block}</small><button class="link-btn" data-product="${item.code}">补充</button></div>`).join("")}</div></section>` : ""}
      <section class="form-section"><h3>AI 读取的数据来源</h3><div class="source-grid"><span>设备串码<b>${product.code}</b></span><span>品牌型号<b>${product.name}</b></span><span>成色电池<b>${product.note}</b></span><span>售价租价<b>${product.price} / ${product.rent}</b></span><span>来源成本<b>${product.source} / ${product.cost}</b></span><span>售后规则<b>90 天基础保障</b></span></div></section>
      <section class="form-section"><h3>生成的闲鱼素材</h3><div class="material-preview"><div class="material-images"><div class="phone-poster ${product.tone}"><div class="phone-thumb ${product.tone}"><span></span></div><b>${product.name.split(" ")[0]}</b><small>38 项检测 · 门店可验机</small></div><div class="detail-poster"><b>成色</b><span>${product.note}</span></div><div class="detail-poster"><b>价格</b><span>${product.price} · ${product.rent}</span></div></div><label>闲鱼标题<input value="${product.name}｜${product.note.split(" · ")[0]}｜门店可验机｜支持先租后买"></label><label>商品描述<textarea rows="7">${product.name}，${product.note}。门店已完成基础检测，支持到店验机。售价 ${product.price}，如需短期过渡使用，可参考 ${product.rent}。旧机抵扣需到店检测后确认，售后以门店规则为准。</textarea></label><label>售后与风险说明<textarea rows="4">非人为故障 90 天基础保障；电池、屏幕、进水和人为损坏需按检测结果处理。不承诺未核实库存、额外优惠或平台规则外服务。</textarea></label></div></section>
      <section class="form-section"><h3>人工审阅</h3><div class="review-box"><label><input type="checkbox" ${blocked ? "" : "checked"}> 我已确认图片、描述、价格、库存、售后承诺与真实设备一致</label><div class="row-actions"><button class="btn secondary small" data-action="regenerate-material"><i data-lucide="refresh-cw"></i>重新生成</button><button class="btn secondary small" data-action="preview-xianyu"><i data-lucide="eye"></i>预览闲鱼发布页</button><button class="btn primary small" data-action="${blocked ? "blocked-publish" : "submit-review"}"><i data-lucide="file-check-2"></i>${blocked ? "查看阻断原因" : "提交审核"}</button></div></div></section>`
  });
}

function publishGateModal(product = products[0]) {
  const canPublish = product.publishStatus === "可上架" && product.completeness === 100 && product.materialStatus === "素材已生成" && product.stock !== "0 台";
  openModal({
    title: canPublish ? "确认发布到闲鱼" : "暂不能发布到闲鱼",
    subtitle: canPublish ? "校验通过后可加入自动上架任务" : "请先完成发布前置校验",
    icon: canPublish ? "upload-cloud" : "circle-alert",
    body: `<div class="publish-gate-modal"><div class="publish-checks"><span class="${product.completeness === 100 ? "ok" : "bad"}"><i data-lucide="${product.completeness === 100 ? "check" : "x"}"></i>设备档案 ${product.completeness}%</span><span class="${product.materialStatus === "素材已生成" ? "ok" : "bad"}"><i data-lucide="${product.materialStatus === "素材已生成" ? "check" : "x"}"></i>${product.materialStatus}</span><span class="${product.stock !== "0 台" ? "ok" : "bad"}"><i data-lucide="${product.stock !== "0 台" ? "check" : "x"}"></i>库存 ${product.stock}</span><span class="${product.publishStatus === "可上架" ? "ok" : "bad"}"><i data-lucide="${product.publishStatus === "可上架" ? "check" : "x"}"></i>${product.publishStatus}</span></div><p>${canPublish ? "系统将把该商品加入上下架任务队列，任务状态为发布中。" : "未通过校验的商品不会进入发布队列，避免错误描述、错误价格或无库存承诺引发纠纷。"}</p></div><div class="modal-actions"><button class="btn secondary" data-action="close-modal">取消</button><button class="btn ${canPublish ? "primary" : "secondary"}" data-action="${canPublish ? "confirm-publish" : "marketing-material"}">${canPublish ? "确认发布到闲鱼" : "去生成/补充素材"}</button></div>`
  });
}

function openModal({ title, subtitle = "", icon = "info", body = "" }) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalSubtitle").textContent = subtitle;
  document.getElementById("modalIcon").innerHTML = `<i data-lucide="${icon}"></i>`;
  document.getElementById("modalBody").innerHTML = body;
  modalBackdrop.classList.add("open");
  initIcons();
}

function closeModal() { modalBackdrop.classList.remove("open"); }

function authorizeModal() {
  openModal({ title: "扫码授权闲鱼店铺", subtitle: "使用闲鱼 App 扫码完成店铺授权", icon: "scan-line", body: `<div class="qr-box"></div><p class="modal-tip">二维码将在 04:52 后失效。授权仅用于同步商品、订单和消息，不会保存您的闲鱼登录密码。</p><div class="modal-actions"><button class="btn secondary" data-action="close-modal">取消</button><button class="btn primary" data-action="mock-authorized">我已完成扫码</button></div>` });
}

function phoneModal() {
  openModal({ title: "提醒门店接管", subtitle: "系统将通过虚拟电话联系当前值班人员", icon: "phone-call", body: `<div style="display:grid;gap:12px"><label style="display:grid;gap:6px">接听人<select><option>王店长 · 138****2086</option><option>李店员 · 136****7712</option></select></label><label style="display:grid;gap:6px">提醒原因<select><option>高意向用户已确认到店</option><option>退款/投诉需人工处理</option><option>价格或库存需确认</option></select></label><div class="drawer-note"><i data-lucide="info"></i><span>接通后将播报买家昵称、咨询商品、意向和需要处理的事项，不向买家暴露店员手机号。</span></div></div><div class="modal-actions"><button class="btn secondary" data-action="close-modal">取消</button><button class="btn primary" data-action="confirm-call"><i data-lucide="phone-call"></i>立即呼叫</button></div>` });
}

function settingsDrawer() {
  openDrawer({ eyebrow: "系统设置", title: "基础设置", body: `<section class="form-section"><h3>门店信息</h3><div class="form-grid"><label>门店名称<input value="城南数码旗舰店"></label><label>联系电话<input value="0769-2288 6631"></label><label class="span-2">门店地址<input value="南城万达广场 2 号门旁城南数码"></label></div></section><section class="form-section"><h3>风险与权限</h3><div class="form-grid"><label>默认接管人<select><option>王店长</option></select></label><label>价格审批角色<select><option>店长</option></select></label><label>自动回复时段<select><option>全天 24 小时</option></select></label><label>日志保留<select><option>180 天</option></select></label></div></section>` });
}

document.addEventListener("click", event => {
  const nav = event.target.closest("[data-nav]");
  if (nav) { navigate(nav.dataset.nav); return; }

  const conversation = event.target.closest("[data-conversation]");
  if (conversation) {
    document.querySelectorAll(".conversation-item").forEach(item => item.classList.remove("active"));
    conversation.classList.add("active");
    const data = conversations.find(item => item.id === Number(conversation.dataset.conversation));
    renderChat(data);
    if (data.id !== 1) showToast(`已切换至 ${data.name} 的会话（演示数据）`);
    return;
  }

  const imPlatform = event.target.closest("[data-im-platform]");
  if (imPlatform) {
    activeImPlatform = imPlatform.dataset.imPlatform;
    document.querySelectorAll("[data-im-platform]").forEach(button => button.classList.toggle("active", button === imPlatform));
    const search = document.getElementById("conversationSearch");
    search.value = "";
    renderConversations();
    showToast(`已切换到${platformMeta[activeImPlatform].name} IM 会话`);
    return;
  }

  const productButton = event.target.closest("[data-product]");
  if (productButton) { productDrawer(products.find(item => item.code === productButton.dataset.product)); return; }
  const orderButton = event.target.closest("[data-order]");
  if (orderButton) { orderDrawer(orders.find(item => item.no === orderButton.dataset.order)); return; }

  const insightTab = event.target.closest("[data-insight]");
  if (insightTab) {
    document.querySelectorAll("[data-insight]").forEach(button => button.classList.toggle("active", button === insightTab));
    document.querySelectorAll("[data-insight-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.insightPanel === insightTab.dataset.insight));
    return;
  }

  const aiTab = event.target.closest("[data-ai-tab]");
  if (aiTab) {
    document.querySelectorAll("[data-ai-tab]").forEach(button => button.classList.toggle("active", button === aiTab));
    document.querySelectorAll("[data-ai-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.aiPanel === aiTab.dataset.aiTab));
    return;
  }

  const productTab = event.target.closest("[data-product-tab]");
  if (productTab) {
    document.querySelectorAll("[data-product-tab]").forEach(button => button.classList.toggle("active", button === productTab));
    document.querySelectorAll("[data-product-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.productPanel === productTab.dataset.productTab));
    return;
  }

  const templateCategory = event.target.closest("[data-template-category]");
  if (templateCategory) {
    document.querySelectorAll("[data-template-category]").forEach(button => button.classList.toggle("active", button === templateCategory));
    const search = document.getElementById("templateSearch");
    search.value = "";
    renderTemplates(templateCategory.dataset.templateCategory);
    showToast(`已切换到${templateCategories[templateCategory.dataset.templateCategory].title}`);
    return;
  }

  const materialButton = event.target.closest("[data-material]");
  if (materialButton) { materialDrawer(products.find(item => item.code === materialButton.dataset.material)); return; }

  const publishButton = event.target.closest("[data-publish-product]");
  if (publishButton) { publishGateModal(products.find(item => item.code === publishButton.dataset.publishProduct)); return; }

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  if (action === "close-drawer") closeDrawer();
  if (action === "close-modal") closeModal();
  if (action === "authorize-store") authorizeModal();
  if (action === "mock-authorized") { closeModal(); showToast("店铺授权成功，正在同步商品与消息"); }
  if (["new-plan", "edit-plan", "generate-lead", "create-order"].includes(action)) planDrawer();
  if (action === "open-product") productDrawer(products[0]);
  if (action === "marketing-material") { closeModal(); materialDrawer(products[0]); showToast("演示模式默认选择 iPhone 13 生成素材"); }
  if (action === "bulk-publish") publishGateModal(products.find(item => item.publishStatus !== "可上架") || products[0]);
  if (action === "bulk-down") showToast("已生成批量下架确认任务，演示模式不执行真实下架");
  if (action === "regenerate-material") showToast("已重新生成图片、标题和商品描述，请人工复核后提交");
  if (action === "preview-xianyu") showToast("已打开闲鱼发布页预览（演示）");
  if (action === "submit-review") showToast("已提交审核，审核通过后才可加入闲鱼上架任务");
  if (action === "blocked-publish") showToast("当前商品存在阻断项，请先补全设备档案和库存信息");
  if (action === "confirm-publish") { closeModal(); publishTasks[0].state = "发布中"; renderPublishTasks(); document.querySelector('[data-product-tab="publish"]').click(); showToast("已加入上下架任务，状态为发布中"); }
  if (["edit-template", "new-template", "add-rule"].includes(action)) templateDrawer();
  if (action === "phone-call") phoneModal();
  if (action === "confirm-call") { closeModal(); showToast("已发起虚拟电话，等待王店长接听"); }
  if (action === "save-drawer") { closeDrawer(); showToast("已保存，相关数据将供 AI 实时读取"); }
  if (action === "save-settings") showToast("已保存本店业务规则，平台安全规则不会被关闭");
  if (action === "switch-role") setRole(currentRole === "store" ? "ops" : "store");
  if (action === "publish-policy") showToast("策略已发布，命中的门店将在 5 分钟内生效");
  if (action === "ops-template") opsTemplateDrawer(event.target.closest("[data-template-id]")?.dataset.templateId || "new");
  if (action === "test-ai-reply") showToast("测试结果：命中疑似套现，AI 转人工且不自动发送");
  if (action === "publish-template") showToast("模板已发布，命中的门店将在 5 分钟内生效并写入审计日志");
  if (action === "review-correction") showToast("已进入纠错审核详情，确认后才会写入风格样本库");
  if (action === "approve-correction") showToast("纠错已通过审核，并沉淀为标准回复样本");
  if (action === "reject-correction") showToast("已驳回纠错，不会影响线上回复策略");
  if (action === "sync-products") showToast("已开始同步 3 家店铺的闲鱼商品");
  if (action === "refresh") showToast("店铺连接状态已刷新");
  if (action === "import-device") showToast("请通过 USB 连接待入库手机");
  if (action === "complete-all") { event.target.textContent = "已全部标记"; showToast("今日待办已全部标记为已读"); }
  if (action === "settings") { closeFloating(); settingsDrawer(); }
  if (action === "logout") showToast("演示模式不会真正退出登录");
  if (action === "style-preview") showToast("已切换一条示例回复进行风格预览");
});

document.getElementById("storePicker").addEventListener("click", event => {
  event.stopPropagation();
  document.getElementById("profilePopover").classList.remove("open");
  document.getElementById("notificationPanel").classList.remove("open");
  document.getElementById("storePopover").classList.toggle("open");
});
document.getElementById("profileBtn").addEventListener("click", event => {
  event.stopPropagation(); closeFloating(); document.getElementById("profilePopover").classList.toggle("open");
});
document.getElementById("notificationBtn").addEventListener("click", event => {
  event.stopPropagation(); closeFloating(); document.getElementById("notificationPanel").classList.toggle("open");
});
document.addEventListener("click", event => {
  if (!event.target.closest(".popover") && !event.target.closest(".notification-panel")) closeFloating();
});

document.getElementById("conversationSearch").addEventListener("input", event => renderConversations(event.target.value));
document.getElementById("productSearch").addEventListener("input", event => renderProducts(event.target.value));
document.getElementById("templateSearch").addEventListener("input", event => {
  const activeCategory = document.querySelector("[data-template-category].active")?.dataset.templateCategory || "all";
  renderTemplates(activeCategory, event.target.value);
});
document.getElementById("useSuggestion").addEventListener("click", () => {
  document.getElementById("messageInput").value = "好的，已为您保留到今天 17:30。门店地址是南城万达广场 2 号门旁城南数码，到店报“林先生”即可。";
  document.getElementById("messageInput").focus();
});

function sendMessage() {
  const input = document.getElementById("messageInput");
  const value = input.value.trim();
  if (!value) return showToast("请输入回复内容");
  const item = document.createElement("div");
  item.className = "message agent";
  item.innerHTML = `<span class="avatar blue">王</span><div><p></p><small>人工回复 · 刚刚</small></div>`;
  item.querySelector("p").textContent = value;
  document.getElementById("messages").appendChild(item);
  input.value = "";
  document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
  showToast("消息已发送，AI 已暂停本轮自动回复");
}
document.getElementById("sendMessage").addEventListener("click", sendMessage);
document.getElementById("messageInput").addEventListener("keydown", event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } });

document.getElementById("transferBtn").addEventListener("click", event => {
  const active = event.currentTarget.classList.toggle("active");
  event.currentTarget.innerHTML = active ? `<i data-lucide="bot"></i>交还 AI` : `<i data-lucide="user-round"></i>转人工`;
  document.querySelector(".ai-state").innerHTML = active ? `<i data-lucide="user-round"></i>人工接待中` : `<i data-lucide="bot"></i>AI 正在接待`;
  showToast(active ? "已切换人工接待，AI 停止自动发送" : "会话已交还 AI 接待");
  initIcons();
});

drawerBackdrop.addEventListener("click", closeDrawer);
modalBackdrop.addEventListener("click", event => { if (event.target === modalBackdrop) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") { closeDrawer(); closeModal(); closeFloating(); } });

renderConversations();
renderProducts();
renderDevices();
renderKnowledgeGaps();
renderPublishTasks();
renderTemplates();
renderOrders();
renderChart();
initIcons();
