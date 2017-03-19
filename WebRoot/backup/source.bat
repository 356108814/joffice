::还原数据
set savepath=D:\oa\Tomcat\webapps\joffice\backup\data\
set ext=%date:~0,4%%date:~5,2%%date:~8,2%
mysql -uroot -proot
use joffice21
source %savepath%business_%ext%.sql