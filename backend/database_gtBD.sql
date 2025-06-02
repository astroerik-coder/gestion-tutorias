/*
 * Desarrollado por : DennisM.Andino
 * Contactame a mi correo : dennis_andino@outlook.com
 * mi canal de Youtube: CodigoCompartido
 * proyecto disponible en : https://github.com/dennis-andino/GT
*/

create database IF NOT EXISTS gtBD character set utf8 collate utf8_general_ci;
USE gtBD;
create user 'usergtDB'@'localhost' identified by 'CdAcc350';
grant all privileges on gtBD.* to 'usergtDB'@'localhost';
flush privileges;

use gtBD;
create table ROLES
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    baseon         VARCHAR(20)        NOT NULL,
    privilege      VARCHAR(20) UNIQUE NOT NULL,
    announcement   BOOLEAN default 0  NOT NULL,
    Messenger      BOOLEAN default 0  NOT NULL,
    ownsched       BOOLEAN default 1  NOT NULL,
    createtutoring BOOLEAN default 1  NOT NULL,
    crudstudent    BOOLEAN default 0  NOT NULL,
    denytutoring   BOOLEAN default 0  NOT NULL,
    jointutoring   BOOLEAN default 1  NOT NULL,
    foro           BOOLEAN default 0  NOT NULL
);


CREATE TABLE CAMPUS
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(50)
);

CREATE TABLE CAREERS
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(100) NOT NULL
);

CREATE TABLE TUTORTYPES
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    description  VARCHAR(50) NOT NULL,
    hour_payment float(8, 2)
);

CREATE TABLE BINNACLE
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    typeevent   VARCHAR(100),
    description VARCHAR(500),
    date_event   VARCHAR(25) DEFAULT CURDATE(),
    hour_event   VARCHAR(25) DEFAULT DATE_FORMAT(NOW( ), "%H:%i"),
    username    VARCHAR(25) DEFAULT 'Sistema',
    ip_address    VARCHAR(50)
);


CREATE TABLE COURSES
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    coursename VARCHAR(100) NOT NULL,
    career     INT          NOT NULL,
    FOREIGN KEY (career) REFERENCES CAREERS (id)
);


CREATE TABLE LOGINS
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    username      VARCHAR(25) UNIQUE     NOT NULL,
    pass          VARCHAR(200)           NOT NULL,
    userRole      INT                    NOT NULL,
    createOn      VARCHAR(20)            NOT NULL,
    lastUpdate    VARCHAR(20)            NOT NULL,
    fullname      VARCHAR(50)            NOT NULL,
    alias         VARCHAR(50)            NOT NULL,
    email         VARCHAR(200) UNIQUE    NOT NULL,
    phone         VARCHAR(50)            NOT NULL,
    campus        INT                    NOT NULL,
    career        INT                    NOT NULL,
    account       VARCHAR(20)            NOT NULL,
    birthDate     VARCHAR(20)            NOT NULL,
    admissionDate VARCHAR(25)            NOT NULL,
    photo         VARCHAR(300) DEFAULT 'userdefault.png',
    generalPoint  INT          DEFAULT 0,
    observations  VARCHAR(500),
    tutorCategory INT          DEFAULT 1 NOT NULL,
    availability  BOOLEAN      DEFAULT 1 NOT NULL,
    FOREIGN KEY (tutorCategory) REFERENCES TUTORTYPES (id),
    FOREIGN KEY (userRole) REFERENCES ROLES (id),
    FOREIGN KEY (career) REFERENCES CAREERS (id),
    FOREIGN KEY (campus) REFERENCES CAMPUS (id)
);


CREATE TABLE SCHEDULES
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    starttime    VARCHAR(10)       NOT NULL,
    finishtime   VARCHAR(10)       NOT NULL,
    availability BOOLEAN DEFAULT 1 NOT NULL
);


CREATE TABLE SCH_TUT
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    tutor        INT               NOT NULL,
    schedule     INT               NOT NULL,
    course       INT               NOT NULL,
    availability BOOLEAN DEFAULT 1 NOT NULL,
    FOREIGN KEY (tutor) REFERENCES LOGINS (id),
    FOREIGN KEY (schedule) REFERENCES schedules (id),
    FOREIGN KEY (course) REFERENCES courses (id)
);

CREATE TABLE PERIODS
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(100) NOT NULL,
    stardate    VARCHAR(20)  NOT NULL,
    finishdate  VARCHAR(20)  NOT NULL
);

CREATE TABLE TUTORIALS
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    subject     VARCHAR(100)            NOT NULL,
    details     VARCHAR(500)            NOT NULL,
    reservdate  VARCHAR(25)             NOT NULL,
    requestdate VARCHAR(25)             NOT NULL,
    filename    varchar(100) DEFAULT '0',/*Empty*/
    status      INT          DEFAULT -1 NOT NULL, /* -1 pendiente , 0 en proceso, 1 aprobado/programada ,2 finalizado,3 Cancelada  */
    score       INT          DEFAULT 0,
    initialtime VARCHAR(25),#hora inicial programada
    finaltime   VARCHAR(25),#hora final programada
    starttime   VARCHAR(25),#hora en que inicio
    finishtime  VARCHAR(25),#hora en que finalizo
    stucomment  VARCHAR(500),
    tutcomment  VARCHAR(500),
    space       VARCHAR(500) DEFAULT  'No definido' NOT NULL,
    period_     INT                     NOT NULL,
    asignatura  INT                     NOT NULL,
    approvedby  INT,
    tutor       INT                     NOT NULL,
    petitioner  INT                     NOT NULL,
    modality    TINYINT DEFAULT 0 NOT NULL, #0 presencial #1 virtual
    FOREIGN KEY (asignatura) REFERENCES COURSES (id),
    FOREIGN KEY (tutor) REFERENCES LOGINS (id),
    FOREIGN KEY (petitioner) REFERENCES LOGINS (id),
    FOREIGN KEY (approvedby) REFERENCES LOGINS (id),
    FOREIGN KEY (period_) REFERENCES PERIODS (id)
);


CREATE TABLE MEMBERS_ASSISTANCE
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    tutorial   INT NOT NULL,
    student    INT NOT NULL,
    assistance BOOLEAN default 0,
    FOREIGN KEY (tutorial) REFERENCES TUTORIALS (id),
    FOREIGN KEY (student) REFERENCES LOGINS (id)
);

CREATE TABLE INSTITUTION(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100) NOT NULL ,
vision VARCHAR(500) NOT NULL,
mission VARCHAR(500) NOT NULL,
address VARCHAR(150) NOT NULL,
telefone VARCHAR(50) NOT NULL,
email VARCHAR(100) NOT NULL,
logo VARCHAR(100) NOT NULL
);

CREATE TABLE SECTIONS
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(100) NOT NULL,
    availability BOOLEAN DEFAULT 1 NOT NULL
);


CREATE TABLE NOTIFICATIONS(
  id INT PRIMARY KEY AUTO_INCREMENT,
  destinationid INT NOT NULL,
  subject VARCHAR(50) NOT NULL ,
  content VARCHAR(700) NOT NULL ,
  status BOOLEAN DEFAULT 0 NOT NULL,
  date VARCHAR(25) DEFAULT NOW() NOT NULL ,
  FOREIGN KEY (destinationid) REFERENCES LOGINS(id)
);

CREATE TABLE BACKUPS
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    date        VARCHAR(25) DEFAULT NOW() NOT NULL,
    description VARCHAR(500)              NOT NULL,
    autor       VARCHAR(50)                NOT NULL,
    filename    VARCHAR(50)               NOT NULL
);

SELECT id,subject FROM GETTUTORIALINFO where schedule='' and reservdate='' and space='';
SELECT schedule FROM GETTUTORIALINFO;
describe gettutorialinfo;
update tutorials set reservdate='2021-01-31' where id=13;
select modality from tutorials where id=13;
update tutorials set modality=0 where id=19;
update tutorials set status=-1 where id>=21;
select * from sch_tut;
select * from schedules;CONCAT(SCH.starttime, '-', SCH.finishtime)
select CONCAT(starttime, '-',finishtime) as schedule from schedules where id=8 limit 1;
select CONCAT(starttime, '-',finishtime) as schedule from vw_schedules where id=8 limit 1;
select username , alias from logins;
select * from tutorials;
select * from gettutorialinfo;