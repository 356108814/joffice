::备份脚本
set savepath=D:\oa\Tomcat\webapps\joffice\backup\data\
set ext=%date:~0,4%%date:~5,2%%date:~8,2%
mysqldump -uroot -proot joffice21 business > %savepath%business\business_%ext%.sql
mysqldump -uroot -proot joffice21 realty > %savepath%realty\realty_%ext%.sql