-- departments
INSERT INTO [administration].[Departments] (DepartmentName, IsActive, LastUpdatedBy, LastUpdatedTime) VALUES ('DECK', 1, 'System', GETDATE())
INSERT INTO [administration].[Departments] (DepartmentName, IsActive, LastUpdatedBy, LastUpdatedTime) VALUES ('ENGINE', 2, 'System', GETDATE())
INSERT INTO [administration].[Departments] (DepartmentName, IsActive, LastUpdatedBy, LastUpdatedTime) VALUES ('CATERING', 3, 'System', GETDATE())


-- Roles
INSERT INTO [administration].[Roles] (RoleName, IsBHPRequired, IsCertificateRequired, LastUpdatedBy, LastUpdatedTime) VALUES ('OFFICER', 0, 1, 'System', GETDATE())
INSERT INTO [administration].[Roles] (RoleName, IsBHPRequired, IsCertificateRequired, LastUpdatedBy, LastUpdatedTime) VALUES ('CREW', 0, 0 , 'System', GETDATE())
INSERT INTO [administration].[Roles] (RoleName, IsBHPRequired, IsCertificateRequired, LastUpdatedBy, LastUpdatedTime) VALUES ('ENGINEER', 0, 0, 'System', GETDATE())


-- Categories
INSERT INTO [administration].[JobPositionCategories] (CategoryName, LastUpdatedBy, LastUpdatedDate) VALUES ('Main Fleet', 'System', GETDATE())
INSERT INTO [administration].[JobPositionCategories] (CategoryName, LastUpdatedBy, LastUpdatedDate) VALUES ('Offshore', 'System', GETDATE())
INSERT INTO [administration].[JobPositionCategories] (CategoryName, LastUpdatedBy, LastUpdatedDate) VALUES ('Cruise', 'System', GETDATE())
INSERT INTO [administration].[JobPositionCategories] (CategoryName, LastUpdatedBy, LastUpdatedDate) VALUES ('Shore Job', 'System', GETDATE())