// Course completion is separate from scheduled work and interview readiness.
const stages=[
  ['基础查询',['基础查询']],
  ['JOIN / UNION',['JOIN','UNION']],
  ['分组汇总',['GROUP BY','HAVING']],
  ['W3 核心结束',['EXISTS','ANY','ALL','SELECT INTO','INSERT INTO SELECT','CASE','Null Functions','SQL Dates']],
  ['面试专项',['日期与字符串','子查询专项','CTE','窗口函数','分析案例','模拟面试1','模拟面试2']]
];
function calculateRoute(coach){
  const completed=new Set();let current='等待学习记录';
  for(const [,entry] of Object.entries(coach||{}).sort(([a],[b])=>a.localeCompare(b))){
    for(const topic of entry.completedTopics||[])completed.add(topic);
    const title=entry.title||'',status=entry.status||'';
    if(/周测|综合测试/.test(title))continue;
    current=title;
    if(/待学习|待作答|待完成|已发布|未完成|无作答/.test(status))continue;
    if(!/已完成|已批改|作答已批改|完成本主题/.test(status))continue;
    for(const [,topics] of stages)for(const topic of topics){
      if(topic==='基础查询'||/专项|案例|模拟面试/.test(topic))continue;
      if(title.toUpperCase().includes(topic.toUpperCase()))completed.add(topic);
    }
  }
  const fractions=stages.map(([,topics])=>topics.filter(t=>completed.has(t)).length/topics.length);
  const percent=Math.round(fractions.reduce((a,b)=>a+b,0)/stages.length*100);
  return {percent,current,completed:[...completed],fractions};
}
if(typeof module!=='undefined')module.exports={calculateRoute,stages};
if(typeof window!=='undefined')window.calculateLearningRoute=calculateRoute;
