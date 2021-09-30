#include <iostream>
#include <bits/stdc++.h>
#include <unordered_map>
using namespace std;

struct hash_pair{
    template <class T1, class T2>
    size_t operator()(const pair<T1, T2>& p) const
    {
        auto hash1 = hash<T1>{}(p.first);
        auto hash2 = hash<T2>{}(p.second);
        return hash1 ^ hash2;
    }
};

typedef pair<int,int> pd;

vector <int> di = {2,2,-2,-2,-1,-1,1,1};
vector <int> dj = {1,-1,1,-1,2,-2,2,-2};

unordered_map <pair<int,int>,int,hash_pair> visit;
unordered_map <pair<int,int>,int,hash_pair> distance;

bool isValid(int x,int y){
    if(x < 0 || y < 0 || x > 1000000000 || y > 1000000000)
        return false;
    return true;
}

void fun(){
    // int X,Y;
    //cin >> X >> Y;
    int result = 0;
    
    queue <pair<int,pd>> q;
    q.push(make_pair(0,make_pair(0,0)));
    visit[make_pair(0,0)] = 1;
    
    while(!q.empty()){
        pair<int,pd> qEle = q.front();
        q.pop();
        int x = qEle.second.first, y = qEle.second.second, dist = qEle.first;
        
        distance[make_pair(x,y)] = dist;
        
        for(int k = 0; k < 8; k++){
            int xx = x + di[k], yy = y + dj[k];
            
            if(isValid(xx,yy) && visit[make_pair(xx,yy)] == 0){
                visit[make_pair(xx,yy)] = 1;
                q.push(make_pair(dist+1,make_pair(xx,yy)));
            }
        }
    }
}

int main(){
    int t;
    cin >> t;
    
    fun();
    
    for(int i = 0; i < t; i++){
        int x,y;
        cin >> x >> y;
        cout << distance[make_pair(x,y)] << endl;
    }
    
    return 0;
}