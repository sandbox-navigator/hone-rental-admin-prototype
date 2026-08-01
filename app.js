const conversations = [
  { id: 1, name: "林先生", avatar: "林", color: "green", time: "刚刚", message: "可以，下午四点半左右到，地址发我。", unread: 2, state: "待人工", status: "在线 · 来自闲鱼" },
  { id: 2, name: "陈同学", avatar: "陈", color: "orange", time: "3 分钟", message: "学生租的话需要什么资料？", unread: 1, state: "AI接待", status: "在线 · 来自闲鱼" },
  { id: 3, name: "用户_8123", avatar: "8", color: "blue", time: "8 分钟", message: "屏幕有问题，我要退款。", unread: 1, state: "待人工", status: "离线 · 来自闲鱼" },
  { id: 4, name: "赵女士", avatar: "赵", color: "green", time: "12 分钟", message: "旧机可以抵多少？我下班过去。", unread: 0, state: "高意向", status: "在线 · 来自闲鱼" },
  { id: 5, name: "小飞数码", avatar: "飞", color: "blue", time: "26 分钟", message: "这台机器有没有维修过？", unread: 0, state: "AI接待", status: "在线 · 来自闲鱼" },
  { id: 6, name: "Momo", avatar: "M", color: "orange", time: "1 小时", message: "能不能只看额度，机器不要？", unread: 2, state: "风险", status: "离线 · 来自闲鱼" }
];

const products = [
  { id: "XY88120311", code: "SN13-0821", name: "iPhone 13 128G 星光色", note: "95新 · 电池89% · 原装屏", tone: "dark", store: "城南数码旗舰店", price: "¥3,299", rent: "首期299 / 月租269", stock: "1 台", completeness: 100, status: "在售", stats: "咨询 86 · 线索 19" },
  { id: "XY88120346", code: "SN14P-0318", name: "iPhone 14 Pro 256G 暗紫色", note: "9成新 · 电池86% · 原装屏", tone: "dark", store: "城南数码旗舰店", price: "¥5,199", rent: "首期399 / 月租359", stock: "2 台", completeness: 100, status: "在售", stats: "咨询 63 · 线索 12" },
  { id: "XY77540219", code: "SNM50-1206", name: "华为 Mate 50 256G 昆仑霞光", note: "95新 · 电池92% · 无拆修", tone: "gold", store: "万达手机快修", price: "¥3,599", rent: "首期299 / 月租289", stock: "1 台", completeness: 82, status: "在售", stats: "咨询 41 · 线索 8" },
  { id: "XY66310872", code: "SN12-0415", name: "iPhone 12 128G 白色", note: "9成新 · 电池84% · 更换电池", tone: "light", store: "青禾二手优品", price: "¥2,199", rent: "待配置租赁方案", stock: "3 台", completeness: 64, status: "草稿", stats: "咨询 0 · 线索 0" },
  { id: "XY55831092", code: "SNK60-0221", name: "Redmi K60 12+256G 墨羽", note: "95新 · 电池95% · 无拆修", tone: "dark", store: "万达手机快修", price: "¥1,699", rent: "首期199 / 月租169", stock: "0 台", completeness: 100, status: "已下架", stats: "咨询 28 · 线索 5" }
];

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

function navigate(pageName) {
  document.querySelectorAll(".page").forEach(page => page.classList.toggle("active", page.dataset.page === pageName));
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.nav === pageName));
  closeFloating();
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (pageName === "im") setTimeout(() => { const messages = document.getElementById("messages"); messages.scrollTop = messages.scrollHeight; }, 50);
}

function renderConversations(filter = "") {
  const list = document.getElementById("conversationList");
  list.innerHTML = conversations.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()) || item.message.includes(filter)).map((item, index) => `
    <button class="conversation-item ${index === 0 ? "active" : ""}" data-conversation="${item.id}">
      <span class="avatar ${item.color}">${item.avatar}</span>
      <span class="conversation-info"><span><b>${item.name}</b><small>${item.time}</small></span><p>${item.message}</p></span>
      <span class="conversation-meta">${item.unread ? `<b class="count">${item.unread}</b>` : ""}<small class="mini-state">${item.state}</small></span>
    </button>`).join("");
}

function renderProducts(filter = "") {
  const rows = document.getElementById("productRows");
  rows.innerHTML = products.filter(product => [product.name, product.id, product.code].some(value => value.toLowerCase().includes(filter.toLowerCase()))).map(product => {
    const knowledgeClass = product.completeness < 100 ? "warn" : "";
    const statusClass = product.status === "在售" ? "green" : product.status === "草稿" ? "orange" : "blue";
    return `<tr>
      <td><input type="checkbox"></td>
      <td><div class="product-cell"><div class="phone-thumb ${product.tone}"><span></span></div><span><b>${product.name}</b><small>商品ID ${product.id} · 设备 ${product.code}</small><small>${product.note}</small></span></div></td>
      <td>${product.store}</td><td><div class="price-stack"><b>${product.price}</b><small>${product.rent}</small></div></td><td>${product.stock}</td>
      <td><div class="progress-label ${knowledgeClass}"><span><i style="width:${product.completeness}%"></i></span><b>${product.completeness}%</b></div></td>
      <td><span class="tag ${statusClass}">${product.status}</span></td><td>${product.stats}</td>
      <td><div class="row-actions"><button class="link-btn" data-product="${product.code}">详情</button><button class="icon-btn plain" title="更多"><i data-lucide="ellipsis"></i></button></div></td>
    </tr>`;
  }).join("");
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

function openDrawer({ eyebrow = "详情", title = "", body = "", saveLabel = "保存更新" }) {
  document.getElementById("drawerEyebrow").textContent = eyebrow;
  document.getElementById("drawerTitle").textContent = title;
  document.getElementById("drawerBody").innerHTML = body;
  drawer.querySelector("footer .primary").innerHTML = `<i data-lucide="save"></i>${saveLabel}`;
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
      <section class="form-section"><h3>商品信息</h3><div class="form-grid"><label>商品标题<input value="${product.name}｜38项检测｜门店可验机"></label><label>闲鱼售价<input value="${product.price.replace("¥", "")}"></label><label>所属店铺<select><option>${product.store}</option></select></label><label>可用库存<input value="${product.stock.replace(" 台", "")}"></label></div></section>
      <section class="form-section"><h3>设备档案</h3><div class="form-grid"><label>设备串码<input value="${product.code}"></label><label>IMEI<input value="35 642109 82•••• 1"></label><label>成色等级<select><option>${product.note.split(" · ")[0]}</option></select></label><label>电池健康<input value="${product.note.match(/电池\d+%/)?.[0].replace("电池","") || "待补充"}"></label><label>屏幕情况<select><option>${product.note.split(" · ")[2] || "待核验"}</option></select></label><label>维修记录<select><option>无主板维修记录</option></select></label></div></section>
      <section class="form-section"><h3>租赁与买断</h3><div class="form-grid"><label>首期金额<input value="${product.rent.includes("首期") ? product.rent.split(" / ")[0].replace("首期","") : "待配置"}"></label><label>月租金额<input value="${product.rent.includes("月租") ? product.rent.split("月租")[1] : "待配置"}"></label><label>默认租期<select><option>3 个月</option><option>6 个月</option><option>12 个月</option></select></label><label>预计买断价<input value="2899"></label></div></section>
      <div class="drawer-note"><i data-lucide="triangle-alert"></i><span>商品、设备档案与租赁方案会共同供 AI 客服读取。价格或库存发生冲突时，系统会停止自动承诺并转人工。</span></div>`
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
    document.getElementById("chatBuyer").textContent = data.name;
    document.getElementById("chatAvatar").textContent = data.avatar;
    document.getElementById("chatAvatar").className = `avatar ${data.color}`;
    document.getElementById("chatStatus").textContent = data.status;
    if (data.id !== 1) showToast(`已切换至 ${data.name} 的会话（演示数据）`);
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

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  if (action === "close-drawer") closeDrawer();
  if (action === "close-modal") closeModal();
  if (action === "authorize-store") authorizeModal();
  if (action === "mock-authorized") { closeModal(); showToast("店铺授权成功，正在同步商品与消息"); }
  if (["new-plan", "edit-plan", "generate-lead", "create-order"].includes(action)) planDrawer();
  if (action === "open-product") productDrawer(products[0]);
  if (["edit-template", "new-template", "add-rule"].includes(action)) templateDrawer();
  if (action === "phone-call") phoneModal();
  if (action === "confirm-call") { closeModal(); showToast("已发起虚拟电话，等待王店长接听"); }
  if (action === "save-drawer") { closeDrawer(); showToast("已保存，相关数据将供 AI 实时读取"); }
  if (action === "save-settings") showToast("AI 客服设置已保存并生效");
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
renderOrders();
renderChart();
initIcons();
