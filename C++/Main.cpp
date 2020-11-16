#include <bits/stdc++.h>
using namespace std;
// ........................macro k.......................... //
#define FOR(i, f, n) for(int (i) = (f); (i) < (int)(n); ++(i))
#define RFOR(i, f, n) for(int (i) = (f); (i) > (int)(n); --(i))
#define FER(i, f, n) for(int (i) = (f); (i) <= (int)(n); ++(i))
#define RFER(i, f, n) for(int (i) = (f); (i) >= (int)(n); --(i))
#define pb push_back
#define fi first
#define se second
#define endl '\n'
#define sz(A) (int)(A).size()
#define ALL(A) A.begin(), A.end()
#define ub(A,B) upper_bound(ALL(A), B) - A.begin()
#define lb(A,B) lower_bound(ALL(A), B) - A.begin()
#define MS(A,B) memset(A,B,sizeof(A));
#define UNIQUE(c) (c).resize(unique(ALL(c)) - (c).begin())  //벡터에서 중복된수 제거 
 
typedef long long i64;
typedef unsigned long long ui64;
typedef double ld;
typedef pair<int, int> ii;
typedef pair<int, ii> iii;
typedef vector<int> vi;
typedef vector<i64> vi64;
typedef vector<string> vs;
typedef vector<vi> vvi;
typedef vector<ii> vii;
typedef vector<vii> vvii;
inline i64 gcd(i64 a, i64 b) { if (a % b == 0)return b; else { return gcd(b, a % b); } }
inline i64 lcm(i64 a, i64 b) { return a * b / gcd(a, b); }
inline i64 gaus(i64 a, i64 b) { return (a + b) * (b - a + 1) / 2; }
inline i64 Pow(i64 x,i64 n,i64 m){i64 r=1;while(n){if(n&1){r=(r*x)%m;}x=(x*x)%m;n>>=1;}return r;}
 
template <class T> ostream& operator<<(ostream& os, vector<T> v) {
	os << "[";
	int cnt = 0;
	for (auto vv : v) { os << vv; if (++cnt < v.size()) os << ","; }
	return os << "]";
}
template <class L, class R> ostream& operator<<(ostream& os, map<L, R> v) {
	os << "[";
	int cnt = 0;
	for (auto vv : v) { os << vv; if (++cnt < v.size()) os << ","; }
	return os << "]";
}
template <class L, class R> ostream& operator<<(ostream& os, pair<L, R> p) {
	return os << "(" << p.fi << "," << p.se << ")";
}
// ........................fuction1.......................... //
 
// KMP Algorithm
/*
vector<int> getPi(string p) {
    int m = (int)p.size();
    int j = 0;
    vector<int> pi(m, 0);
    for (int i = 1; i< m; i++) {
        while (j > 0 && p[i] != p[j])
            j = pi[j - 1];
        if (p[i] == p[j])
            pi[i] = ++j;
    }
    return pi;
}
vector<int> kmp(string s, string p) {
    vector<int> ans;
    auto pi = getPi(p);
    int n = (int)s.size(), m = (int)p.size(), j = 0;
    for (int i = 0; i < n; i++) {
        while (j>0 && s[i] != p[j])
            j = pi[j - 1];
        if (s[i] == p[j]) {
            if (j == m - 1) {
                ans.push_back(i - m + 1);
                j = pi[j];
            }
            else j++;
        }
    }
    return ans;
}
*/
// 다익스트라 알고리즘
/*
vector<pair<int, int> > adj[1001];
vector<int> dijkstra(int start, int V) {
	int INF=987654321;
    vector<int> dist(V, INF);
    dist[start] = 0;
    priority_queue<pair<int, int> > q;
    q.push(make_pair(0, start));
 
    while (!q.empty()) {
        int cost = -q.top().first;
        int from = q.top().second;
        q.pop();
 
        if (dist[from] < cost) continue;
 
        for (int i = 0; i < adj[from].size(); i++) {
            int to = adj[from][i].first;
            int distFromTo = cost + adj[from][i].second;
            if (distFromTo < dist[to] ) {
                dist[to] = distFromTo;
                q.push(make_pair(-distFromTo, to));
            }
        }
    }
    return dist;
}
*/
/*
// TRIE Algorithm
const int MAXCHAR = 26;
int toNumber(const char c){ return c - 'A';}
struct TrieNode{
    bool terminal;
    struct TrieNode* children[MAXCHAR];
    TrieNode() : terminal(false){
        memset(children, 0, sizeof(children));
    }
    ~TrieNode(){
        for(int i=0;i<MAXCHAR;i++) if(children[i])
            delete children[i];
    }
    void insert(const char* key){
        if((*key) == 0) {
          terminal = true;
        }
        else{
            int next = toNumber(*key);
            if(children[next] == NULL){
                children[next] = new struct TrieNode();
            }
            children[next]->insert(key+1);
        }
    }
    TrieNode* find(const char* key){
        if(*key == 0)
          return this;
        int next = toNumber(*key);
        if(children[next] == NULL) return NULL;
        return children[next]->find(key+1);
    }
};
*/
/*	
// segment tree
class SegmentTree {
private:
    i64* nodes;
    i64* A;
 
	i64 init(int index, int start, int end)
    {
        if(start == end)
            nodes[index] = A[start];
        else
            nodes[index] =
            init(2*index+1, start, (start+end)/2) +
            init(2*index+2, (start+end)/2+1, end);
 
        return nodes[index];
    }
public:
    SegmentTree(int N, i64* A){
        int h = (int)ceil(log2(N));
        int node_size = 1 << (h+1);
        nodes = new i64[node_size];
 
        this->A = A;
        init(0, 0, N-1);
    }
    ~SegmentTree(){
        delete [] nodes;
    }
    i64 getSum(int index, int start, int end, int left, int right)
    {
        //구하려는 범위가 밖에 있는 경우
        if(left > end || right < start)
            return 0;
        else if(left <= start && right >= end)
            return nodes[index];
 
        int mid = (start+end)/2;
        return getSum(index*2+1, start, mid, left, right) +
               getSum(index*2+2, mid+1, end, left, right);
    }
    void update(int changed_index, i64 diff, int index, int start, int end)
    {
        if(changed_index < start || changed_index > end )
            return;
 
        nodes[index] += diff;
 
        if(start != end){
            int mid = (start + end)/2;
            update(changed_index, diff, index*2+1, start,mid);
            update(changed_index, diff, index*2+2, mid+1,end);
        }
    }
};
*/
/*
  //고속 푸리에 변환  ( x 1,2,3,4 -> 1,2,3,4,1,2,3,4  배열로 2*n 배열을 만들고 y 5,6,7,8 n 이있으면 S 배열 2*n 크기로 푸리에값을 리턴해줌 이떄 s 배열 n~<2*n 을탐색하면 max 값을 찾을수있음)
 typedef complex<double> base;
 
void fft(vector <base> &a, bool invert)
{
    int n = sz(a);
    for (int i=1,j=0;i<n;i++){
        int bit = n >> 1;
        for (;j>=bit;bit>>=1) j -= bit;
        j += bit;
        if (i < j) swap(a[i],a[j]);
    }
    for (int len=2;len<=n;len<<=1){
        double ang = 2*M_PI/len*(invert?-1:1);
        base wlen(cos(ang),sin(ang));
        for (int i=0;i<n;i+=len){
            base w(1);
            for (int j=0;j<len/2;j++){
                base u = a[i+j], v = a[i+j+len/2]*w;
                a[i+j] = u+v;
                a[i+j+len/2] = u-v;
                w *= wlen;
            }
        }
    }
    if (invert){
        for (int i=0;i<n;i++) a[i] /= n;
    }
}
 
void multiply(const vector<int> &a,const vector<int> &b,vector<int> &res)
{
    vector <base> fa(ALL(a)), fb(ALL(b));
    int n = 1;
    while (n < max(sz(a),sz(b))) n <<= 1;
    fa.resize(n); fb.resize(n);
    fft(fa,false); fft(fb,false);
    for (int i=0;i<n;i++) fa[i] *= fb[i];
    fft(fa,true);
    res.resize(n);
    for (int i=0;i<n;i++) res[i] = int(fa[i].real()+(fa[i].real()>0?0.5:-0.5));
}
*/
// ........................fuction2.......................... //
 
// ........................main.......................... //
void solve() {
 
} 
 
int main() {
	cin.tie(0), ios_base::sync_with_stdio(false);
	solve();
	return 0;
}
