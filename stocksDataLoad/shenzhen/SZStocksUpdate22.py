from sqlalchemy import create_engine, false
import tushare as ts
us=ts.get_k_data('300601',start='2018-08-01', end='2018-08-01')
vs=ts.get_k_data('300602',start='2018-08-01', end='2018-08-01')
ws=ts.get_k_data('300603',start='2018-08-01', end='2018-08-01')
xs=ts.get_k_data('300604',start='2018-08-01', end='2018-08-01')
ys=ts.get_k_data('300605',start='2018-08-01', end='2018-08-01')
at=ts.get_k_data('300606',start='2018-08-01', end='2018-08-01')
bt=ts.get_k_data('300607',start='2018-08-01', end='2018-08-01')
ct=ts.get_k_data('300608',start='2018-08-01', end='2018-08-01')
dt=ts.get_k_data('300609',start='2018-08-01', end='2018-08-01')
et=ts.get_k_data('300610',start='2018-08-01', end='2018-08-01')
ft=ts.get_k_data('300611',start='2018-08-01', end='2018-08-01')
gt=ts.get_k_data('300612',start='2018-08-01', end='2018-08-01')
ht=ts.get_k_data('300613',start='2018-08-01', end='2018-08-01')
it=ts.get_k_data('300615',start='2018-08-01', end='2018-08-01')
jt=ts.get_k_data('300616',start='2018-08-01', end='2018-08-01')
kt=ts.get_k_data('300617',start='2018-08-01', end='2018-08-01')
lt=ts.get_k_data('300618',start='2018-08-01', end='2018-08-01')
mt=ts.get_k_data('300619',start='2018-08-01', end='2018-08-01')
nt=ts.get_k_data('300620',start='2018-08-01', end='2018-08-01')
ot=ts.get_k_data('300621',start='2018-08-01', end='2018-08-01')
pt=ts.get_k_data('300622',start='2018-08-01', end='2018-08-01')
qt=ts.get_k_data('300623',start='2018-08-01', end='2018-08-01')
rt=ts.get_k_data('300624',start='2018-08-01', end='2018-08-01')
st=ts.get_k_data('300625',start='2018-08-01', end='2018-08-01')
ut=ts.get_k_data('300626',start='2018-08-01', end='2018-08-01')
vt=ts.get_k_data('300627',start='2018-08-01', end='2018-08-01')
wt=ts.get_k_data('300628',start='2018-08-01', end='2018-08-01')
xt=ts.get_k_data('300629',start='2018-08-01', end='2018-08-01')
yt=ts.get_k_data('300630',start='2018-08-01', end='2018-08-01')
zt=ts.get_k_data('300631',start='2018-08-01', end='2018-08-01')
au=ts.get_k_data('300632',start='2018-08-01', end='2018-08-01')
bu=ts.get_k_data('300633',start='2018-08-01', end='2018-08-01')
cu=ts.get_k_data('300634',start='2018-08-01', end='2018-08-01')
du=ts.get_k_data('300635',start='2018-08-01', end='2018-08-01')
eu=ts.get_k_data('300636',start='2018-08-01', end='2018-08-01')
fu=ts.get_k_data('300637',start='2018-08-01', end='2018-08-01')
gu=ts.get_k_data('300638',start='2018-08-01', end='2018-08-01')
hu=ts.get_k_data('300639',start='2018-08-01', end='2018-08-01')
iu=ts.get_k_data('300640',start='2018-08-01', end='2018-08-01')
ju=ts.get_k_data('300641',start='2018-08-01', end='2018-08-01')
ku=ts.get_k_data('300642',start='2018-08-01', end='2018-08-01')
lu=ts.get_k_data('300643',start='2018-08-01', end='2018-08-01')
mu=ts.get_k_data('300644',start='2018-08-01', end='2018-08-01')
nu=ts.get_k_data('300645',start='2018-08-01', end='2018-08-01')
ou=ts.get_k_data('300647',start='2018-08-01', end='2018-08-01')
pu=ts.get_k_data('300648',start='2018-08-01', end='2018-08-01')
qu=ts.get_k_data('300649',start='2018-08-01', end='2018-08-01')
ru=ts.get_k_data('300650',start='2018-08-01', end='2018-08-01')
su=ts.get_k_data('300651',start='2018-08-01', end='2018-08-01')
tu=ts.get_k_data('300652',start='2018-08-01', end='2018-08-01')
uu=ts.get_k_data('300653',start='2018-08-01', end='2018-08-01')
vu=ts.get_k_data('300654',start='2018-08-01', end='2018-08-01')
wu=ts.get_k_data('300655',start='2018-08-01', end='2018-08-01')
xu=ts.get_k_data('300656',start='2018-08-01', end='2018-08-01')
yu=ts.get_k_data('300657',start='2018-08-01', end='2018-08-01')
zu=ts.get_k_data('300658',start='2018-08-01', end='2018-08-01')
av=ts.get_k_data('300659',start='2018-08-01', end='2018-08-01')
bv=ts.get_k_data('300660',start='2018-08-01', end='2018-08-01')
cv=ts.get_k_data('300661',start='2018-08-01', end='2018-08-01')
dv=ts.get_k_data('300662',start='2018-08-01', end='2018-08-01')
ev=ts.get_k_data('300663',start='2018-08-01', end='2018-08-01')
fv=ts.get_k_data('300664',start='2018-08-01', end='2018-08-01')
gv=ts.get_k_data('300665',start='2018-08-01', end='2018-08-01')
hv=ts.get_k_data('300666',start='2018-08-01', end='2018-08-01')
iv=ts.get_k_data('300667',start='2018-08-01', end='2018-08-01')
jv=ts.get_k_data('300668',start='2018-08-01', end='2018-08-01')
kv=ts.get_k_data('300669',start='2018-08-01', end='2018-08-01')
lv=ts.get_k_data('300670',start='2018-08-01', end='2018-08-01')
mv=ts.get_k_data('300671',start='2018-08-01', end='2018-08-01')
nv=ts.get_k_data('300672',start='2018-08-01', end='2018-08-01')
ov=ts.get_k_data('300673',start='2018-08-01', end='2018-08-01')
pv=ts.get_k_data('300675',start='2018-08-01', end='2018-08-01')
qv=ts.get_k_data('300676',start='2018-08-01', end='2018-08-01')
rv=ts.get_k_data('300677',start='2018-08-01', end='2018-08-01')
sv=ts.get_k_data('300678',start='2018-08-01', end='2018-08-01')
tv=ts.get_k_data('300679',start='2018-08-01', end='2018-08-01')
uv=ts.get_k_data('300680',start='2018-08-01', end='2018-08-01')
vv=ts.get_k_data('300681',start='2018-08-01', end='2018-08-01')
wv=ts.get_k_data('300682',start='2018-08-01', end='2018-08-01')
xv=ts.get_k_data('300683',start='2018-08-01', end='2018-08-01')
yv=ts.get_k_data('300684',start='2018-08-01', end='2018-08-01')
zv=ts.get_k_data('300685',start='2018-08-01', end='2018-08-01')
aw=ts.get_k_data('300686',start='2018-08-01', end='2018-08-01')
bw=ts.get_k_data('300687',start='2018-08-01', end='2018-08-01')
cw=ts.get_k_data('300688',start='2018-08-01', end='2018-08-01')
dw=ts.get_k_data('300689',start='2018-08-01', end='2018-08-01')
ew=ts.get_k_data('300690',start='2018-08-01', end='2018-08-01')
fw=ts.get_k_data('300691',start='2018-08-01', end='2018-08-01')
gw=ts.get_k_data('300692',start='2018-08-01', end='2018-08-01')
hw=ts.get_k_data('300693',start='2018-08-01', end='2018-08-01')
iw=ts.get_k_data('300695',start='2018-08-01', end='2018-08-01')
jw=ts.get_k_data('300696',start='2018-08-01', end='2018-08-01')
kw=ts.get_k_data('300697',start='2018-08-01', end='2018-08-01')
lw=ts.get_k_data('300698',start='2018-08-01', end='2018-08-01')
mw=ts.get_k_data('300699',start='2018-08-01', end='2018-08-01')
nw=ts.get_k_data('300700',start='2018-08-01', end='2018-08-01')
ow=ts.get_k_data('300701',start='2018-08-01', end='2018-08-01')
pw=ts.get_k_data('300702',start='2018-08-01', end='2018-08-01')
qw=ts.get_k_data('300703',start='2018-08-01', end='2018-08-01')
rw=ts.get_k_data('300705',start='2018-08-01', end='2018-08-01')
sw=ts.get_k_data('300706',start='2018-08-01', end='2018-08-01')
tw=ts.get_k_data('300707',start='2018-08-01', end='2018-08-01')
uw=ts.get_k_data('300708',start='2018-08-01', end='2018-08-01')
vw=ts.get_k_data('300709',start='2018-08-01', end='2018-08-01')
ww=ts.get_k_data('300710',start='2018-08-01', end='2018-08-01')
xw=ts.get_k_data('300711',start='2018-08-01', end='2018-08-01')
yw=ts.get_k_data('300712',start='2018-08-01', end='2018-08-01')
zw=ts.get_k_data('300713',start='2018-08-01', end='2018-08-01')
ax=ts.get_k_data('300715',start='2018-08-01', end='2018-08-01')
bx=ts.get_k_data('300716',start='2018-08-01', end='2018-08-01')
cx=ts.get_k_data('300717',start='2018-08-01', end='2018-08-01')
dx=ts.get_k_data('300718',start='2018-08-01', end='2018-08-01')
ex=ts.get_k_data('300719',start='2018-08-01', end='2018-08-01')
fx=ts.get_k_data('300720',start='2018-08-01', end='2018-08-01')
gx=ts.get_k_data('300721',start='2018-08-01', end='2018-08-01')
hx=ts.get_k_data('300722',start='2018-08-01', end='2018-08-01')
ix=ts.get_k_data('300723',start='2018-08-01', end='2018-08-01')
jx=ts.get_k_data('300725',start='2018-08-01', end='2018-08-01')
kx=ts.get_k_data('300726',start='2018-08-01', end='2018-08-01')
lx=ts.get_k_data('300727',start='2018-08-01', end='2018-08-01')
mx=ts.get_k_data('300729',start='2018-08-01', end='2018-08-01')
nx=ts.get_k_data('300730',start='2018-08-01', end='2018-08-01')
ox=ts.get_k_data('300731',start='2018-08-01', end='2018-08-01')
px=ts.get_k_data('300732',start='2018-08-01', end='2018-08-01')
qx=ts.get_k_data('300733',start='2018-08-01', end='2018-08-01')
rx=ts.get_k_data('300735',start='2018-08-01', end='2018-08-01')
sx=ts.get_k_data('300736',start='2018-08-01', end='2018-08-01')
tx=ts.get_k_data('300737',start='2018-08-01', end='2018-08-01')
ux=ts.get_k_data('300738',start='2018-08-01', end='2018-08-01')
vx=ts.get_k_data('300739',start='2018-08-01', end='2018-08-01')
wx=ts.get_k_data('300740',start='2018-08-01', end='2018-08-01')
xx=ts.get_k_data('300741',start='2018-08-01', end='2018-08-01')
yx=ts.get_k_data('300742',start='2018-08-01', end='2018-08-01')
zx=ts.get_k_data('300743',start='2018-08-01', end='2018-08-01')
ay=ts.get_k_data('300745',start='2018-08-01', end='2018-08-01')
by=ts.get_k_data('300746',start='2018-08-01', end='2018-08-01')
cy=ts.get_k_data('300747',start='2018-08-01', end='2018-08-01')
dy=ts.get_k_data('300750',start='2018-08-01', end='2018-08-01')
engine=create_engine('mysql://root:adminadmin@10.35.22.91/stocks?charset=utf8')
us.to_sql('stocksData',engine,if_exists='append')
vs.to_sql('stocksData',engine,if_exists='append')
ws.to_sql('stocksData',engine,if_exists='append')
xs.to_sql('stocksData',engine,if_exists='append')
ys.to_sql('stocksData',engine,if_exists='append')
at.to_sql('stocksData',engine,if_exists='append')
bt.to_sql('stocksData',engine,if_exists='append')
ct.to_sql('stocksData',engine,if_exists='append')
dt.to_sql('stocksData',engine,if_exists='append')
et.to_sql('stocksData',engine,if_exists='append')
ft.to_sql('stocksData',engine,if_exists='append')
gt.to_sql('stocksData',engine,if_exists='append')
ht.to_sql('stocksData',engine,if_exists='append')
it.to_sql('stocksData',engine,if_exists='append')
jt.to_sql('stocksData',engine,if_exists='append')
kt.to_sql('stocksData',engine,if_exists='append')
lt.to_sql('stocksData',engine,if_exists='append')
mt.to_sql('stocksData',engine,if_exists='append')
nt.to_sql('stocksData',engine,if_exists='append')
ot.to_sql('stocksData',engine,if_exists='append')
pt.to_sql('stocksData',engine,if_exists='append')
qt.to_sql('stocksData',engine,if_exists='append')
rt.to_sql('stocksData',engine,if_exists='append')
st.to_sql('stocksData',engine,if_exists='append')
ut.to_sql('stocksData',engine,if_exists='append')
vt.to_sql('stocksData',engine,if_exists='append')
wt.to_sql('stocksData',engine,if_exists='append')
xt.to_sql('stocksData',engine,if_exists='append')
yt.to_sql('stocksData',engine,if_exists='append')
zt.to_sql('stocksData',engine,if_exists='append')
au.to_sql('stocksData',engine,if_exists='append')
bu.to_sql('stocksData',engine,if_exists='append')
cu.to_sql('stocksData',engine,if_exists='append')
du.to_sql('stocksData',engine,if_exists='append')
eu.to_sql('stocksData',engine,if_exists='append')
fu.to_sql('stocksData',engine,if_exists='append')
gu.to_sql('stocksData',engine,if_exists='append')
hu.to_sql('stocksData',engine,if_exists='append')
iu.to_sql('stocksData',engine,if_exists='append')
ju.to_sql('stocksData',engine,if_exists='append')
ku.to_sql('stocksData',engine,if_exists='append')
lu.to_sql('stocksData',engine,if_exists='append')
mu.to_sql('stocksData',engine,if_exists='append')
nu.to_sql('stocksData',engine,if_exists='append')
ou.to_sql('stocksData',engine,if_exists='append')
pu.to_sql('stocksData',engine,if_exists='append')
qu.to_sql('stocksData',engine,if_exists='append')
ru.to_sql('stocksData',engine,if_exists='append')
su.to_sql('stocksData',engine,if_exists='append')
tu.to_sql('stocksData',engine,if_exists='append')
uu.to_sql('stocksData',engine,if_exists='append')
vu.to_sql('stocksData',engine,if_exists='append')
wu.to_sql('stocksData',engine,if_exists='append')
xu.to_sql('stocksData',engine,if_exists='append')
yu.to_sql('stocksData',engine,if_exists='append')
zu.to_sql('stocksData',engine,if_exists='append')
av.to_sql('stocksData',engine,if_exists='append')
bv.to_sql('stocksData',engine,if_exists='append')
cv.to_sql('stocksData',engine,if_exists='append')
dv.to_sql('stocksData',engine,if_exists='append')
ev.to_sql('stocksData',engine,if_exists='append')
fv.to_sql('stocksData',engine,if_exists='append')
gv.to_sql('stocksData',engine,if_exists='append')
hv.to_sql('stocksData',engine,if_exists='append')
iv.to_sql('stocksData',engine,if_exists='append')
jv.to_sql('stocksData',engine,if_exists='append')
kv.to_sql('stocksData',engine,if_exists='append')
lv.to_sql('stocksData',engine,if_exists='append')
mv.to_sql('stocksData',engine,if_exists='append')
nv.to_sql('stocksData',engine,if_exists='append')
ov.to_sql('stocksData',engine,if_exists='append')
pv.to_sql('stocksData',engine,if_exists='append')
qv.to_sql('stocksData',engine,if_exists='append')
rv.to_sql('stocksData',engine,if_exists='append')
sv.to_sql('stocksData',engine,if_exists='append')
tv.to_sql('stocksData',engine,if_exists='append')
uv.to_sql('stocksData',engine,if_exists='append')
vv.to_sql('stocksData',engine,if_exists='append')
wv.to_sql('stocksData',engine,if_exists='append')
xv.to_sql('stocksData',engine,if_exists='append')
yv.to_sql('stocksData',engine,if_exists='append')
zv.to_sql('stocksData',engine,if_exists='append')
aw.to_sql('stocksData',engine,if_exists='append')
bw.to_sql('stocksData',engine,if_exists='append')
cw.to_sql('stocksData',engine,if_exists='append')
dw.to_sql('stocksData',engine,if_exists='append')
ew.to_sql('stocksData',engine,if_exists='append')
fw.to_sql('stocksData',engine,if_exists='append')
gw.to_sql('stocksData',engine,if_exists='append')
hw.to_sql('stocksData',engine,if_exists='append')
iw.to_sql('stocksData',engine,if_exists='append')
jw.to_sql('stocksData',engine,if_exists='append')
kw.to_sql('stocksData',engine,if_exists='append')
lw.to_sql('stocksData',engine,if_exists='append')
mw.to_sql('stocksData',engine,if_exists='append')
nw.to_sql('stocksData',engine,if_exists='append')
ow.to_sql('stocksData',engine,if_exists='append')
pw.to_sql('stocksData',engine,if_exists='append')
qw.to_sql('stocksData',engine,if_exists='append')
rw.to_sql('stocksData',engine,if_exists='append')
sw.to_sql('stocksData',engine,if_exists='append')
tw.to_sql('stocksData',engine,if_exists='append')
uw.to_sql('stocksData',engine,if_exists='append')
vw.to_sql('stocksData',engine,if_exists='append')
ww.to_sql('stocksData',engine,if_exists='append')
xw.to_sql('stocksData',engine,if_exists='append')
yw.to_sql('stocksData',engine,if_exists='append')
zw.to_sql('stocksData',engine,if_exists='append')
ax.to_sql('stocksData',engine,if_exists='append')
bx.to_sql('stocksData',engine,if_exists='append')
cx.to_sql('stocksData',engine,if_exists='append')
dx.to_sql('stocksData',engine,if_exists='append')
ex.to_sql('stocksData',engine,if_exists='append')
fx.to_sql('stocksData',engine,if_exists='append')
gx.to_sql('stocksData',engine,if_exists='append')
hx.to_sql('stocksData',engine,if_exists='append')
ix.to_sql('stocksData',engine,if_exists='append')
jx.to_sql('stocksData',engine,if_exists='append')
kx.to_sql('stocksData',engine,if_exists='append')
lx.to_sql('stocksData',engine,if_exists='append')
mx.to_sql('stocksData',engine,if_exists='append')
nx.to_sql('stocksData',engine,if_exists='append')
ox.to_sql('stocksData',engine,if_exists='append')
px.to_sql('stocksData',engine,if_exists='append')
qx.to_sql('stocksData',engine,if_exists='append')
rx.to_sql('stocksData',engine,if_exists='append')
sx.to_sql('stocksData',engine,if_exists='append')
tx.to_sql('stocksData',engine,if_exists='append')
ux.to_sql('stocksData',engine,if_exists='append')
vx.to_sql('stocksData',engine,if_exists='append')
wx.to_sql('stocksData',engine,if_exists='append')
xx.to_sql('stocksData',engine,if_exists='append')
yx.to_sql('stocksData',engine,if_exists='append')
zx.to_sql('stocksData',engine,if_exists='append')
ay.to_sql('stocksData',engine,if_exists='append')
by.to_sql('stocksData',engine,if_exists='append')
cy.to_sql('stocksData',engine,if_exists='append')
dy.to_sql('stocksData',engine,if_exists='append')