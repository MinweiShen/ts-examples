#!./node_modules/.bin/ts-node
class TreeNode {
  public children: TreeNode[];
  constructor(public val: number, public hasApple: boolean) {
    this.children = [];
  }

  append(n: TreeNode) {
    this.children.push(n);
  }
}

function minTime(n: number, edges: number[][], hasApple: boolean[]): number {
  const nodes = new Array(n).fill(1).map((_, idx) => new TreeNode(idx, hasApple[idx]));
  for(const [from, to] of edges) {
    const [a, b] = from < to ? [from, to] : [to, from];
    nodes[b].append(nodes[a])
  }
  const nodesWithApple = nodes.filter(n => n.hasApple);
  const timeMap: Record<number, number> = {};
  const nodesReachable: Record<number, Set<number>> = {};
  nodesWithApple.forEach(n => { 
    timeMap[n.val] = 0;
    nodesReachable[n.val] = new Set(n.children.map(child => child.val));
  });
}


const n = 7
const edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]]
const hasApple = [false,false,true,false,true,true,false]

console.log(minTime(n, edges, hasApple))
