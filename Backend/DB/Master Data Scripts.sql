INSERT INTO [administration].[JobPositionCategories](CategoryName,  LastUpdatedBy, LastUpdatedOn) VALUES ('Ch/Engineer', 'System', GETUTCDATE())
INSERT INTO [administration].[JobPositionCategories](CategoryName,  LastUpdatedBy, LastUpdatedOn) VALUES ('Ch/Officer', 'System', GETUTCDATE())

INSERT INTO [administration].[JobPositionCategories](CategoryName,  LastUpdatedBy, LastUpdatedOn) VALUES ('Engineer', 'System', GETUTCDATE())
INSERT INTO [administration].[JobPositionCategories](CategoryName,  LastUpdatedBy, LastUpdatedOn) VALUES ('Officer', 'System', GETUTCDATE())

INSERT INTO [administration].[JobPositionCategories](CategoryName,  LastUpdatedBy, LastUpdatedOn) VALUES ('Electrical Officer', 'System', GETUTCDATE())
INSERT INTO [administration].[JobPositionCategories](CategoryName,  LastUpdatedBy, LastUpdatedOn) VALUES ('Gas Enginner', 'System', GETUTCDATE())

INSERT INTO [administration].[JobPositionCategories](CategoryName,  LastUpdatedBy, LastUpdatedOn) VALUES ('AB W/COP', 'System', GETUTCDATE())
INSERT INTO [administration].[JobPositionCategories](CategoryName,  LastUpdatedBy, LastUpdatedOn) VALUES ('OilersW/CP', 'System', GETUTCDATE())

INSERT INTO [administration].[JobPositionCategories](CategoryName,  LastUpdatedBy, LastUpdatedOn) VALUES ('Bosun', 'System', GETUTCDATE())
INSERT INTO [administration].[JobPositionCategories](CategoryName,  LastUpdatedBy, LastUpdatedOn) VALUES ('Engine Fitter', 'System', GETUTCDATE())

INSERT INTO [administration].[JobPositionCategories](CategoryName,  LastUpdatedBy, LastUpdatedOn) VALUES ('Ch/Cook', 'System', GETUTCDATE())
INSERT INTO [administration].[JobPositionCategories](CategoryName,  LastUpdatedBy, LastUpdatedOn) VALUES ('OS w/WK', 'System', GETUTCDATE())

INSERT INTO [administration].[JobPositionCategories](CategoryName,  LastUpdatedBy, LastUpdatedOn) VALUES ('Wiper w/WK', 'System', GETUTCDATE())
INSERT INTO [administration].[JobPositionCategories](CategoryName,  LastUpdatedBy, LastUpdatedOn) VALUES ('Messman', 'System', GETUTCDATE())

--------------------------


INSERT INTO [administration].[Users] (UserName, [Password], DisplayName, FirstName, LastName, EMail, MobileNumber, Role, LastUpdatedBy, LastUpdatedTime) 
VALUES ('Guest', 'password#1', 'Guest', 'Guest', 'Guest', 'guest@gmail.com', NULL, 1, 'System', GETUTCDATE())

INSERT INTO [administration].[Users] (UserName, [Password], DisplayName, FirstName, LastName, EMail, MobileNumber, Role, LastUpdatedBy, LastUpdatedTime) 
VALUES ('admin', 'admin', 'MJP Admin', 'Admin', 'User', 'admin@gmail.com', NULL, 4, 'System', GETUTCDATE())

INSERT INTO [administration].[Users] (UserName, [Password], DisplayName, FirstName, LastName, EMail, MobileNumber, Role, LastUpdatedBy, LastUpdatedTime) 
VALUES ('staff', 'staff', 'MJP Staff', 'Staff', 'User', 'sraff@gmail.com', NULL, 3, 'System', GETUTCDATE())

---------------------------------------